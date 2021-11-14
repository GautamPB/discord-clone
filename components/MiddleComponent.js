import { Avatar } from '@material-ui/core'
import { useCollection } from 'react-firebase-hooks/firestore'
import getChats from '../utils/getChats'

const MiddleComponent = ({ id, users }) => {
    return (
        <div className="flex items-center space-x-2 group">
            {/* <Avatar src={image} alt={title} /> */}
            <Avatar />
            <p className="text-gray-400 group-hover:text-white cursor-pointer">
                User 1
            </p>
        </div>
    )
}

export default MiddleComponent
