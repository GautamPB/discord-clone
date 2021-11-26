import { Avatar } from '@material-ui/core'
import { useRouter } from 'next/router'

const ServerImage = ({ photoURL, serverId }) => {
    const router = useRouter()

    return (
        <div
            className="cursor-pointer"
            onClick={() => {
                router.push(`/chat/${serverId}`)
            }}
        >
            <Avatar src={photoURL} />
        </div>
    )
}

export default ServerImage
