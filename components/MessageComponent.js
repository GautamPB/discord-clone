import { Avatar } from '@material-ui/core'
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { PencilIcon } from '@heroicons/react/solid'
import { TrashIcon } from '@heroicons/react/solid'

const MessageComponent = ({ profilePhoto, userEmail, timestamp, message }) => {
    const [showOptions, setShowOptions] = useState(false)

    const handleEditMessage = (e) => {
        e.preventDefault()
        setShowOptions(false)
        console.log('Edit the message')
    }

    const handleDeleteMessage = (e) => {
        e.preventDefault()
        setShowOptions(false)
        console.log('Delete the message')
    }

    return (
        <div className="messageComponent flex items-start space-x-3 hover:bg-[#32353B] relative">
            <div>
                <Avatar src={profilePhoto} />
            </div>

            <div className="flex flex-col space-y-1 w-full">
                <div className="flex items-end space-x-3">
                    <p className="font-semibold">{userEmail}</p>
                    <p className="text-[12px] text-[#BDBDBD] font-semibold">
                        {timestamp}
                    </p>
                </div>

                <div className="flex items-start w-full">
                    <p className="flex-1">{message}</p>
                </div>
            </div>

            <DotsHorizontalIcon
                className="h-6 cursor-pointer mr-2"
                onClick={() => setShowOptions(!showOptions)}
            />

            {showOptions ? (
                <div className="absolute right-2 top-8 p-3 rounded-md w-[175px] space-y-2 bg-[#18191C]">
                    <div
                        className="flex items-center text-[#BDBDBD] cursor-pointer"
                        onClick={handleEditMessage}
                    >
                        <p className="flex-1">Edit message</p>
                        <PencilIcon className="h-4" />
                    </div>

                    <div
                        className="flex items-center text-[#B71C1C] cursor-pointer"
                        onClick={handleDeleteMessage}
                    >
                        <p className="flex-1">Delete message</p>
                        <TrashIcon className="h-4" />
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default MessageComponent
