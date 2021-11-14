//render DMs first.
//render channels once server has been selected.
import { useState } from 'react'
import { Avatar } from '@material-ui/core'
import { auth, db } from '../firebase'
import MiddleComponent from './MiddleComponent'
import { useAuthState } from 'react-firebase-hooks/auth'
import * as EmailValidator from 'email-validator'
import { useCollection } from 'react-firebase-hooks/firestore'

const MiddleBar = () => {
    const [user] = useAuthState(auth)

    const chatRef = db
        .collection('chats')
        .where('users', 'array-contains', user.email)

    const [chatsSnapshot] = useCollection(chatRef)

    const [email, setEmail] = useState('')

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
        <div className="bg-[#33363C] w-[300px] p-4 hidden lg:inline-block items-center space-y-3">
            <div className="space-y-3">
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

            <div className="space-y-4">
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
        </div>
    )
}

export default MiddleBar
