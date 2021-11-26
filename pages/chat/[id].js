import Sidebar from '../../components/Sidebar'
import MiddleBar from '../../components/MiddleBar'
import ChatScreen from '../../components/ChatScreen'

const Chat = () => {
    return (
        <div className="flex h-[100vh]">
            <Sidebar />
            <div className="flex items-center w-full">
                <div className="w-[300px] flex h-full">
                    <MiddleBar />
                </div>
                <ChatScreen />
            </div>
        </div>
    )
}

export default Chat
