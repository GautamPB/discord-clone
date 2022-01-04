//render DMs first.
//render channels once server has been selected.
import { useState } from 'react'
// import { Avatar } from '@material-ui/core'
import { auth, db } from '../firebase'
import MiddleComponent from './MiddleComponent'
import { useAuthState } from 'react-firebase-hooks/auth'
import * as EmailValidator from 'email-validator'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import { selectActiveServer } from '../slices/activeServerSlice'
import { ChevronDownIcon } from '@heroicons/react/solid'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { PlusIcon } from '@heroicons/react/solid'
import { LogoutIcon } from '@heroicons/react/solid'

const MiddleBar = ({ middleBarData, dataType }) => {
    const [user] = useAuthState(auth)

    const activeServer = useSelector(selectActiveServer)

    const chatRef = db
        .collection('chats')
        .where('users', 'array-contains', user.email)

    const [chatsSnapshot] = useCollection(chatRef)

    const [email, setEmail] = useState('')

    const [activeChannel, setActiveChannel] = useState('general')

    const [openDropdown, setOpenDropdown] = useState(false)

    const checkChatExists = (recipientEmail) => {
        return chatsSnapshot?.docs.find(
            (chat) =>
                chat.data().users.find((user) => user === recipientEmail)
                    ?.length > 0
        )
    }

    const createChat = (e) => {
        e.preventDefault()
        if (
            EmailValidator.validate(email) &&
            email !== user.email &&
            !checkChatExists(email)
        ) {
            db.collection('chats').add({
                users: [user.email, email],
            })
        }
        setEmail('')
    }

    return (
        <div className="bg-[#33363C] w-full pb-4 items-center space-y-3 h-full">
            {middleBarData && dataType === 'server' ? (
                <>
                    <div
                        className="py-3 bg-[#33363C] shadow-lg border-b-2 border-[#36393F] relative flex items-center cursor-pointer"
                        onClick={() => setOpenDropdown(!openDropdown)}
                    >
                        <p className="text-white font-semibold px-3 flex-1">
                            {activeServer.serverName}
                        </p>

                        <ChevronDownIcon className="h-5 text-white mr-4" />

                        {!openDropdown ? (
                            <div className="flex flex-col absolute bg-[#18191C] p-4 rounded-md top-[4rem] w-[90%] left-3 space-y-3">
                                <div className="serverOptions text-[#3F51B5] ">
                                    <p className="flex-1">Invite People</p>
                                    <PersonAddIcon className="text-[10px] " />
                                </div>

                                <div className="serverOptions text-white">
                                    <p className="flex-1">Create Channel</p>
                                    <PlusIcon className="h-6" />
                                </div>

                                <div className="serverOptions text-[#B71C1C]">
                                    <p className="flex-1">Leave Server</p>
                                    <LogoutIcon className="h-6" />
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>

                    <div className="space-y-3 px-4">
                        <p className="font-bold text-[12px] text-gray-400">
                            TEXT CHANNELS
                        </p>
                    </div>

                    <div className="px-2">
                        <div className="flex flex-col space-y-3">
                            {middleBarData.map((channelData) => (
                                <p
                                    onClick={() =>
                                        setActiveChannel(
                                            channelData.channelName
                                        )
                                    }
                                    className={`${
                                        channelData.channelName ===
                                        activeChannel
                                            ? 'channelStyle activeChannelStyle'
                                            : 'channelStyle'
                                    }`}
                                >
                                    #&nbsp;{channelData.channelName}
                                </p>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="space-y-3 px-4">
                        <form>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Start a conversation"
                                className="bg-[#202225] rounded-lg px-2 py-1 text-sm w-full text-white"
                            />
                            <button
                                onClick={createChat}
                                type="submit"
                                className="hidden"
                            />
                        </form>

                        <p className="font-bold text-[12px] text-gray-400">
                            DIRECT MESSAGES
                        </p>
                    </div>

                    <div className="px-2">
                        <MiddleComponent
                            image="https://cdn.britannica.com/54/188754-050-A3613741/Elon-Musk-2010.jpg"
                            title="Gautam PB"
                        />

                        <MiddleComponent
                            image="https://cdn.britannica.com/54/188754-050-A3613741/Elon-Musk-2010.jpg"
                            title="Roshan Jose"
                        />

                        <MiddleComponent
                            image="https://cdn.britannica.com/54/188754-050-A3613741/Elon-Musk-2010.jpg"
                            title="Nishanth Navada"
                        />

                        <MiddleComponent
                            image="https://cdn.britannica.com/54/188754-050-A3613741/Elon-Musk-2010.jpg"
                            title="Pranav Satyababu"
                        />
                        {/* {chatsSnapshot.docs.map((chat) => (
                    <MiddleComponent key = {chat.id} image = {chat.photoURL} />
                ))} */}
                    </div>
                </>
            )}
        </div>
    )
}

export default MiddleBar
