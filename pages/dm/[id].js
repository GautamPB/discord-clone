import Sidebar from '../../components/Sidebar'
import MiddleBar from '../../components/MiddleBar'
import ChatScreen from '../../components/ChatScreen'
import MiddleComponent from '../../components/MiddleComponent'
import getChats from '../../utils/getChats'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'

const DM = () => {
    const [user] = useAuthState(auth)

    const router = useRouter()

    const dmId = router.query

    console.log(user.email, dmId.id)

    return (
        <div className="flex w-full h-screen">
            <Sidebar />
            <MiddleBar />
        </div>
    )
}

export default DM
