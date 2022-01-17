import { Avatar } from '@material-ui/core'
import { PlusIcon } from '@heroicons/react/outline'
import { IconButton } from '@material-ui/core'
import { HomeIcon } from '@heroicons/react/solid'
import ExploreIcon from '@material-ui/icons/Explore'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useState } from 'react'
import Modal from 'react-modal'
import { createServer } from '../utils/Firestore'
import { useSelector } from 'react-redux'
import { selectUser } from '../slices/userSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { deactivateServers, selectServers } from '../slices/serverSlice'
import { deactivateDms } from '../slices/dmSlice'
import ServerImage from './ServerImage'
import { DotsCircleHorizontalIcon } from '@heroicons/react/solid'

const style = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        marginRight: '-50%',
        backgroundColor: '#202225',
        border: 'none',
        padding: '3rem',
        borderRadius: '20px',
    },
}

const Sidebar = () => {
    const [user] = useAuthState(auth)
    const [openModal, setOpenModal] = useState(false)
    const [serverName, setServerName] = useState('')
    const [serverPhoto, setServerPhoto] = useState('')

    const dispatch = useDispatch()
    const router = useRouter()

    const currentUser = useSelector(selectUser)
    const servers = useSelector(selectServers)

    const handleCreateServer = (e) => {
        e.preventDefault()
        const createNewServer = async () => {
            await createServer(
                serverName,
                serverPhoto,
                currentUser.id,
                currentUser.name,
                currentUser.email
            )
        }
        createNewServer()
        setOpenModal(false)
        setServerName('')
        setServerPhoto('')
    }

    return (
        <div className="flex flex-col bg-[#202225] h-screen pt-4 w-[73px] items-center space-y-3">
            <div className="border-b border-gray-700 pb-4 flex items-center">
                <div className="bg-white w-1.5 h-8 rounded-lg absolute left-0 flex-col flex" />
                <Avatar
                    onClick={() => {
                        router.push('/')
                        auth.signOut()
                        dispatch(deactivateServers())
                        dispatch(deactivateDms())
                    }}
                    className="cursor-pointer"
                    src={user ? user.photoURL : '/discord-avatar.jpg'}
                />
            </div>

            <div className="flex flex-col items-center space-y-4">
                {servers?.map((serverObj) => (
                    <ServerImage
                        photoURL={serverObj.photoURL}
                        serverId={serverObj.serverId}
                    />
                ))}
            </div>

            <div className="flex flex-col space-y-2">
                <IconButton
                    className="bg-gray-500 rounded-full items-center group flex"
                    onClick={() => setOpenModal(true)}
                >
                    <div className="bg-[#202225] group-hover:bg-white w-1.5 h-8 rounded-lg absolute left-[-10px]" />
                    <PlusIcon className="text-green-500 h-8" />
                </IconButton>

                <IconButton className="bg-gray-500 rounded-full items-center group">
                    <div className="bg-[#202225] group-hover:bg-white w-1.5 h-8 rounded-lg absolute left-[-10px]" />
                    <ExploreIcon className="text-green-500 h-8" />
                </IconButton>

                <IconButton
                    className="bg-gray-500 rounded-full items-center group"
                    onClick={() => router.push('/')}
                >
                    <div className="bg-[#202225] group-hover:bg-white w-1.5 h-8 rounded-lg absolute left-[-10px]" />
                    <HomeIcon className="text-green-500 h-6" />
                </IconButton>
            </div>

            <Modal
                style={style}
                isOpen={openModal}
                onRequestClose={() => {
                    setOpenModal(false)
                    setServerName('')
                    setServerPhoto('')
                }}
            >
                <div className="flex flex-col items-center space-y-6">
                    <h1 className="font-bold text-[35px] text-white">
                        Create a server
                    </h1>

                    <form
                        onSubmit={handleCreateServer}
                        className="flex flex-col space-y-3"
                    >
                        <input
                            autoFocus
                            placeholder="Server Name"
                            className="bg-[#33363C] text-lg px-3 py-2 font-semibold rounded-lg text-white"
                            type="text"
                            value={serverName}
                            onChange={(e) => setServerName(e.target.value)}
                        />
                        <input
                            placeholder="Photo URL"
                            className="bg-[#33363C] text-lg px-3 py-2 font-semibold rounded-lg text-white"
                            type="text"
                            value={serverPhoto}
                            onChange={(e) => setServerPhoto(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="bg-[#7289DA] font-semibold w-full py-1 rounded-lg text-white text-lg"
                            onSubmit={handleCreateServer}
                        >
                            Create Server
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Sidebar
