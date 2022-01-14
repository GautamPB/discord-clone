import Sidebar from '../../components/Sidebar'
import MiddleBar from '../../components/MiddleBar'
import ChatScreen from '../../components/ChatScreen'
import MiddleComponent from '../../components/MiddleComponent'
import getChats from '../../utils/getChats'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'
import { fetchDms } from '../../utils/Firestore'
import { db } from '../../firebase'

const DM = () => {
    const [user] = useAuthState(auth)

    const router = useRouter()

    const dmId = router.query

    const query = db
        .collection('chats')
        .where('users', 'array-contains', user.email)

    const [chats] = useCollectionData(query, { idField: 'id' })

    return (
        <div className="flex w-full h-screen">
            <Sidebar />
            <MiddleBar />
        </div>
    )
}

export default DM
