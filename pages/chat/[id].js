import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCurrentUser, getServers } from '../../utils/Firestore'
import Sidebar from '../../components/Sidebar'
import MiddleBar from '../../components/MiddleBar'
import ChatScreen from '../../components/ChatScreen'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { initializeUser } from '../../slices/userSlice'
import { initializeServers } from '../../slices/serverSlice'

const Chat = () => {
    const [user] = useAuthState(auth)
    const dispatch = useDispatch()

    useEffect(() => {
        getCurrentUser(user.email).then(async (userData) => {
            dispatch(initializeUser(userData))
            await getServers(userData.id).then((serverData) => {
                dispatch(initializeServers(serverData))
            })
        })
    }, [user])

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
