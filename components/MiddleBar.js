// const doc = db.collection('cities').doc('SF');

// const observer = doc.onSnapshot(docSnapshot => {
//   console.log(`Received doc snapshot: ${docSnapshot}`);
//   // ...
// }, err => {
//   console.log(`Encountered error: ${err}`);
// }); listener for firestore

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
import {
    createChannel,
    inviteUserToServer,
    leaveServer,
} from '../utils/Firestore'
import { useRouter } from 'next/router'
import { selectUser } from '../slices/userSlice'
import Modal from 'react-modal'

const style = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        marginRight: '-50%',
        backgroundColor: '#202225',
        border: 'none',
        padding: '3rem',
        borderRadius: '20px',
    },
}

const MiddleBar = ({
    middleBarData,
    dataType,
    changeActiveChannel,
    activeChannel,
}) => {
    const [user] = useAuthState(auth)

    const router = useRouter()

    const serverId = router.query

    const activeServer = useSelector(selectActiveServer)

    const activeUser = useSelector(selectUser)

    const chatRef = db
        .collection('chats')
        .where('users', 'array-contains', user.email) //to fetch user dms

    const [chatsSnapshot] = useCollection(chatRef)

    const [email, setEmail] = useState('')
    const [channelName, setChannelName] = useState('')
    const [openInvitePeopleModal, setOpenInvitePeopleModal] = useState(false)
    const [openCreateChannelModal, setOpenCreateChannelModal] = useState(false)
    const [openLeaveServerModal, setOpenLeaveServerModal] = useState(false)
    // const [activeChannel, setActiveChannel] = useState('general')
    const [openDropdown, setOpenDropdown] = useState(false)
    const [invitedEmail, setInvitedEmail] = useState('')

    const checkChatExists = (recipientEmail) => {
        return chatsSnapshot?.docs.find(
            (chat) =>
                chat.data().users.find((user) => user === recipientEmail)
                    ?.length > 0
        )
    }

    const createChat = async (e) => {
        e.preventDefault()
        if (
            EmailValidator.validate(email) &&
            email !== user.email &&
            !checkChatExists(email)
        ) {
            await db
                .collection('chats')
                .add({
                    users: [user.email, email],
                })
                .then(async (docRef) => {
                    await db.collection('chats').doc(docRef.id).update({
                        chatId: docRef.id,
                    })
                })
        }
        setEmail('')
    }

    const handleInvitePeople = async (e) => {
        e.preventDefault()
        setOpenInvitePeopleModal(false)
        setInvitedEmail('')
        await inviteUserToServer(serverId.id, invitedEmail)
    }

    const handleCreateChannel = async (e) => {
        e.preventDefault()
        setOpenCreateChannelModal(false)
        await createChannel(serverId.id, channelName, activeUser.id)
    }

    const handleLeaveServer = async (e) => {
        e.preventDefault()
        setOpenLeaveServerModal(false)
        await leaveServer(activeUser.id, activeUser.email, serverId.id)
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

                        {openDropdown ? (
                            <div className="flex flex-col absolute bg-[#18191C] p-4 rounded-md top-[4rem] w-[90%] left-3 space-y-3">
                                <div
                                    className="serverOptions text-[#3F51B5]"
                                    onClick={() =>
                                        setOpenInvitePeopleModal(true)
                                    }
                                >
                                    <p className="flex-1">Invite People</p>
                                    <PersonAddIcon className="text-[10px] " />
                                </div>

                                <div
                                    className="serverOptions text-white"
                                    onClick={() =>
                                        setOpenCreateChannelModal(true)
                                    }
                                >
                                    <p className="flex-1">Create Channel</p>
                                    <PlusIcon className="h-6" />
                                </div>

                                <div
                                    className="serverOptions text-[#B71C1C]"
                                    onClick={() =>
                                        setOpenLeaveServerModal(true)
                                    }
                                >
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
                        <div className="flex flex-col space-y-1">
                            {middleBarData.map((channelData) => (
                                <p
                                    onClick={() =>
                                        changeActiveChannel(
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
                        {middleBarData?.map((chat) => (
                            <MiddleComponent
                                key={chat.chatId}
                                id={chat.chatId}
                                users={chat.users}
                            />
                        ))}
                    </div>
                </>
            )}

            <Modal
                style={style}
                isOpen={openInvitePeopleModal}
                onRequestClose={() => {
                    setOpenInvitePeopleModal(false)
                    setInvitedEmail('')
                }}
            >
                <div className="flex flex-col items-center space-y-6">
                    <h1 className="font-bold text-[35px] text-white">
                        Invite a person
                    </h1>

                    <form
                        onSubmit={handleInvitePeople}
                        className="flex flex-col space-y-3"
                    >
                        <input
                            autoFocus
                            placeholder="Email of person to invite"
                            className="bg-[#33363C] text-lg px-3 py-2 font-semibold rounded-lg text-white"
                            type="email"
                            value={invitedEmail}
                            onChange={(e) => setInvitedEmail(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="bg-[#7289DA] font-semibold w-full py-1 rounded-lg text-white text-lg"
                            onSubmit={handleInvitePeople}
                        >
                            Invite
                        </button>
                    </form>
                </div>
            </Modal>

            <Modal
                style={style}
                isOpen={openCreateChannelModal}
                onRequestClose={() => {
                    setOpenCreateChannelModal(false)
                    setChannelName('')
                }}
            >
                <div className="flex flex-col items-center space-y-6">
                    <h1 className="font-bold text-[35px] text-white">
                        Create a channel
                    </h1>

                    <form
                        onSubmit={handleCreateChannel}
                        className="flex flex-col space-y-3"
                    >
                        <input
                            autoFocus
                            placeholder="Channel Name"
                            className="bg-[#33363C] text-lg px-3 py-2 font-semibold rounded-lg text-white"
                            type="text"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="bg-[#7289DA] font-semibold w-full py-1 rounded-lg text-white text-lg"
                            onSubmit={handleCreateChannel}
                        >
                            Create Channel
                        </button>
                    </form>
                </div>
            </Modal>

            <Modal
                style={style}
                isOpen={openLeaveServerModal}
                onRequestClose={() => {
                    setOpenLeaveServerModal(false)
                }}
            >
                <div className="flex flex-col items-center space-y-6">
                    <h1 className="font-bold text-[35px] text-white">
                        Are you sure you want to leave?
                    </h1>

                    <div className="flex items-center w-full space-x-4">
                        <button
                            className="bg-[#B71C1C] font-semibold w-full py-1 rounded-lg text-white text-lg"
                            onClick={handleLeaveServer}
                        >
                            Yes
                        </button>

                        <button
                            className="bg-[#7289DA] font-semibold w-full py-1 rounded-lg text-white text-lg"
                            onClick={() => setOpenLeaveServerModal(false)}
                        >
                            No
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default MiddleBar
