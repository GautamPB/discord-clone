import Sidebar from '../../components/Sidebar'
import MiddleBar from '../../components/MiddleBar'
import ChatScreen from '../../components/ChatScreen'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'
import { fetchDms } from '../../utils/Firestore'
import { db } from '../../firebase'
import { useSelector } from 'react-redux'
import { selectDms } from '../../slices/dmSlice'

const DM = () => {
    const [user] = useAuthState(auth)

    const router = useRouter()

    const dmId = router.query

    const dms = useSelector(selectDms)

    const query = db
        .collection('chats')
        .where('users', 'array-contains', user.email)

    // const [chats] = useCollectionData(query, { idField: 'id' })

    return (
        <div className="flex w-full h-screen">
            <Sidebar />
            <MiddleBar middleBarData={dms} dataType="dms" />
        </div>
    )
}

export default DM
