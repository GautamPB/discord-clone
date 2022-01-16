import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import MiddleBar from '../../components/MiddleBar'
import ChatScreen from '../../components/ChatScreen'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { fetchDms, getServers, getCurrentUser } from '../../utils/Firestore'
import { db } from '../../firebase'
import { useSelector, useDispatch } from 'react-redux'
import { selectDms, initializeDms } from '../../slices/dmSlice'
import { initializeUser } from '../../slices/userSlice'
import { initializeServers } from '../../slices/serverSlice'
import getChats from '../../utils/getChats'

const DM = () => {
    const [user] = useAuthState(auth)

    const [activeChat, setActiveChat] = useState('')

    const dispatch = useDispatch()

    const router = useRouter()

    const dmId = router.query

    const dms = useSelector(selectDms)

    const query = db
        .collection('chats')
        .where('users', 'array-contains', user.email)

    // const [chats] = useCollectionData(query, { idField: 'id' })

    useEffect(() => {
        getCurrentUser(user.email).then(async (userData) => {
            dispatch(initializeUser(userData))
            await fetchDms(userData.email).then((dmData) => {
                dispatch(initializeDms(dmData))
            })

            await getServers(userData.id).then((serverData) => {
                dispatch(initializeServers(serverData))
            })

            const chatData = await db.collection('chats').doc(dmId.id).get()

            setActiveChat(getChats(chatData.users, userData.email))
        })
    }, [user, dmId])

    return (
        <div className="flex w-full h-screen">
            <Sidebar />
            <div className="hidden w-[300px] lg:flex lg:h-full">
                <MiddleBar middleBarData={dms} dataType="dms" />
            </div>

            <ChatScreen
                serverId={dmId.id}
                activeChannel={activeChat}
                dataType="dm"
            />
        </div>
    )
}

export default DM
