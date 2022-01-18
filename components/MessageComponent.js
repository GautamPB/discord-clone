import { Avatar } from '@material-ui/core'
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { PencilIcon } from '@heroicons/react/solid'
import { TrashIcon } from '@heroicons/react/solid'
import {
    editMessage,
    deleteMessage,
    editDmMessage,
    deleteDmMessage,
} from '../utils/Firestore'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

const style = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        marginRight: '-50%',
        backgroundColor: '#35383E',
        border: 'none',
        padding: '3rem',
        borderRadius: '20px',
    },
}

const MessageComponent = ({
    messageId,
    profilePhoto,
    userEmail,
    timestamp,
    message,
    channelId,
    dataType,
}) => {
    const [showOptions, setShowOptions] = useState(false)

    const [newMessage, setNewMessage] = useState(message)

    const [isEditing, setIsEditing] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    const router = useRouter()

    const serverId = router.query

    const [user] = useAuthState(auth)

    const handleEditMessage = (e) => {
        e.preventDefault()
        setShowOptions(false)
        setIsEditing(true)
    }

    const handleConfirmEditMessage = (e) => {
        setIsEditing(false)

        if (dataType === 'server') {
            editMessage(serverId.id, channelId, messageId, newMessage)
        } else {
            editDmMessage(serverId.id, messageId, newMessage)
        }
        setNewMessage('')
    }

    const handleDeleteMessage = (e) => {
        e.preventDefault()
        setShowOptions(false)
        setOpenModal(true)
    }

    const handleConfirmDeleteMessage = (e) => {
        e.preventDefault()
        setOpenModal(false)

        if (dataType === 'server') {
            deleteMessage(serverId.id, channelId, messageId)
        } else {
            deleteDmMessage(serverId.id, messageId)
        }
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
                    {!isEditing ? (
                        <p className="flex-1">{message}</p>
                    ) : (
                        <form
                            className="w-full"
                            onSubmit={handleConfirmEditMessage}
                        >
                            <input
                                type="text"
                                // placeholder="Type a message"
                                className="border-none rounded-md p-2 w-full bg-[#40444B]"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                        </form>
                    )}
                </div>
            </div>

            {user.email === userEmail ? (
                <DotsHorizontalIcon
                    className="h-6 cursor-pointer mr-2"
                    onClick={() => setShowOptions(!showOptions)}
                />
            ) : (
                <></>
            )}

            {showOptions ? (
                <div className="absolute right-2 top-8 p-3 rounded-md w-[175px] space-y-2 bg-[#18191C] z-50">
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

            <Modal
                style={style}
                isOpen={openModal}
                onRequestClose={() => setOpenModal(false)}
            >
                <div className="flex flex-col items-start space-y-3 w-full">
                    <h1 className="text-white font-semibold text-xl">
                        Delete Message
                    </h1>

                    <p className="text-[#BDBDBD]">
                        Are you sure you want to delete this message?
                    </p>

                    <div className="p-2 flex items-start space-x-3 shadow-2xl border-gray-600 mt-3">
                        <div>
                            <Avatar src={profilePhoto} />
                        </div>

                        <div className="flex flex-col space-y-1 w-full">
                            <div className="flex items-end space-x-3">
                                <p className="font-semibold text-white">
                                    {userEmail}
                                </p>
                                <p className="text-[12px] text-[#BDBDBD] font-semibold">
                                    {timestamp}
                                </p>
                            </div>

                            <div className="flex items-start w-full text-white">
                                <p className="flex-1">{message}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3 p-3 mt-5">
                    <p
                        className="text-white ml-auto hover:underline cursor-pointer"
                        onClick={() => setOpenModal(false)}
                    >
                        Cancel
                    </p>
                    <p
                        className="text-white ml-auto cursor-pointer bg-[#B71C1C] py-2 px-4 rounded-md"
                        onClick={handleConfirmDeleteMessage}
                    >
                        Delete
                    </p>
                </div>
            </Modal>
        </div>
    )
}

export default MessageComponent
