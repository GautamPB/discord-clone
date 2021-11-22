import { Avatar } from '@material-ui/core'
import { useCollection } from 'react-firebase-hooks/firestore'
import getChats from '../utils/getChats'

const MiddleComponent = ({ id, users }) => {
    return (
        <div className="flex items-center space-x-2 group hover:bg-[#36393F] cursor-pointer px-4 py-2 rounded-lg">
            {/* <Avatar src={image} alt={title} /> */}
            <Avatar className="h-8" />
            <p className="text-gray-400 group-hover:text-white cursor-pointer">
                User 1
            </p>
        </div>
    )
}

export default MiddleComponent
