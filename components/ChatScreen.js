import { useSelector } from 'react-redux'
import { selectActiveServer } from '../slices/activeServerSlice'

const ChatScreen = () => {
    const activeServer = useSelector(selectActiveServer)

    return (
        <div className="bg-[#36393F] w-full text-white px-2 h-full relative">
            <h1 className="shadow px-2 py-4 z-50 font-semibold">
                {activeServer.serverName}
            </h1>

            <div className="m-0 w-full overflow-y-scroll z-0 h-[88%] flex flex-col">
                <h1>Message Tab</h1>
            </div>

            <div className="w-[99%] bottom-2 bg-[#36393F] z-50">
                <input
                    type="text"
                    placeholder="Type a message"
                    className="border-none outline-none rounded-md p-2 w-full bg-[#40444B]"
                />
            </div>
        </div>
    )
}

export default ChatScreen
