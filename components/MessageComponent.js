import { Avatar } from '@material-ui/core'

const MessageComponent = ({ profilePhoto, userEmail, timestamp, message }) => {
    return (
        <div className="messageComponent flex items-start space-x-3 hover:bg-[#32353B]">
            <div>
                <Avatar src={profilePhoto} />
            </div>

            <div className="flex flex-col space-y-1">
                <div className="flex items-end space-x-3">
                    <p className="font-semibold">{userEmail}</p>
                    <p className="text-[12px] text-[#BDBDBD] font-semibold">
                        {timestamp}
                    </p>
                </div>

                <div>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default MessageComponent
