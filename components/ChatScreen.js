import { useSelector } from 'react-redux'
import { selectActiveServer } from '../slices/activeServerSlice'
import { sendMessage, fetchChannelId } from '../utils/Firestore'
import MessagesAreaComponent from './MessagesAreaComponent'
import { useState, useEffect } from 'react'

const ChatScreen = ({ serverId, activeChannel }) => {
    const activeServer = useSelector(selectActiveServer)

    const [channelId, setChannelId] = useState('')

    useEffect(() => {
        fetchChannelId(serverId, activeChannel).then((activeChannelId) => {
            setChannelId(activeChannelId)
        })
    }, [activeChannel])

    return (
        <div className="bg-[#36393F] w-full text-white px-2 h-full relative">
            <h1 className="shadow px-2 py-4 z-50 font-semibold">
                #{activeChannel}
            </h1>

            <div className="m-0 w-full z-0 h-[88%] flex flex-col px-2 py-4">
                <MessagesAreaComponent
                    serverId={activeServer.serverId}
                    channelId={channelId}
                />
            </div>

            <form className="w-[99%] bottom-2 bg-[#36393F] z-50">
                <input
                    type="text"
                    placeholder="Type a message"
                    className="border-none outline-none rounded-md p-2 w-full bg-[#40444B]"
                />
            </form>
        </div>
    )
}

export default ChatScreen
