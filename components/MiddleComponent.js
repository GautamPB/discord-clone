import { Avatar } from '@material-ui/core'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'

const MiddleComponent = ({ id, users }) => {
    const router = useRouter()

    return (
        <div
            className="flex items-center space-x-2 group hover:bg-[#36393F] cursor-pointer px-4 py-2 rounded-lg"
            onClick={() => router.push('/dm/123456')}
        >
            {/* <Avatar src={image} alt={title} /> */}
            <Avatar className="h-8" />
            <p className="text-gray-400 group-hover:text-white cursor-pointer">
                User 1
            </p>
        </div>
    )
}

export default MiddleComponent
