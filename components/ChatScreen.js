import { useSelector } from 'react-redux'
import { selectActiveServer } from '../slices/activeServerSlice'
import { sendMessage, fetchChannelId, sendDmMessage } from '../utils/Firestore'
import MessagesAreaComponent from './MessagesAreaComponent'
import { useState, useEffect } from 'react'
import { selectUser } from '../slices/userSlice'

const ChatScreen = ({ serverId, activeChannel, dataType }) => {
    const activeServer = useSelector(selectActiveServer)

    const activeUser = useSelector(selectUser)

    const [channelId, setChannelId] = useState('')

    const [message, setMessage] = useState('')

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (dataType === 'server') {
            sendMessage(
                serverId,
                channelId,
                message,
                activeUser.email,
                activeUser.photoURL
            )
        } else if (dataType === 'dm') {
            sendDmMessage(
                serverId,
                message,
                activeUser.email,
                activeUser.photoURL
            )
        }
        setMessage('')
    }

    useEffect(() => {
        if (dataType === 'server') {
            fetchChannelId(serverId, activeChannel).then((activeChannelId) => {
                setChannelId(activeChannelId)
            })
        }
    }, [activeChannel])

    return (
        <div className="bg-[#36393F] w-full text-white px-2 h-full relative">
            <h1 className="shadow px-2 py-4 z-50 font-semibold">
                {dataType === 'server'
                    ? `#${activeChannel}`
                    : `@${activeChannel}`}
            </h1>

            <div className="m-0 w-full z-0 h-[88%] flex flex-col px-2 py-4">
                {serverId && channelId ? (
                    <MessagesAreaComponent
                        serverId={activeServer.serverId}
                        channelId={channelId}
                    />
                ) : (
                    <></>
                )}
            </div>

            <form
                className="w-[99%] bottom-2 bg-[#36393F] z-50 mx-4"
                onSubmit={handleSendMessage}
            >
                <input
                    type="text"
                    placeholder="Type a message"
                    className="border-none outline-none rounded-md p-2 w-full bg-[#40444B]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </form>
        </div>
    )
}

export default ChatScreen
