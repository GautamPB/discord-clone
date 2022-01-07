import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
    getCurrentUser,
    getServers,
    fetchServerData,
    fetchServerChannels,
} from '../../utils/Firestore'
import Sidebar from '../../components/Sidebar'
import MiddleBar from '../../components/MiddleBar'
import ChatScreen from '../../components/ChatScreen'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { initializeUser } from '../../slices/userSlice'
import { initializeServers } from '../../slices/serverSlice'
import { initializeActiveServer } from '../../slices/activeServerSlice'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'

const Chat = () => {
    const [user] = useAuthState(auth)
    const dispatch = useDispatch()

    const [activeServer, setActiveServer] = useState({})

    const [middleBarData, setMiddleBarData] = useState([])

    const [activeChannel, setActiveChannel] = useState('general')

    const [dataType, setDataType] = useState('')

    const router = useRouter()

    const serverId = router.query

    const changeActiveChannel = (newChannel) => {
        setActiveChannel(newChannel)
    }

    useEffect(() => {
        getCurrentUser(user.email).then(async (userData) => {
            dispatch(initializeUser(userData))
            await getServers(userData.id).then((serverData) => {
                dispatch(initializeServers(serverData))
            })
        })

        const getServerData = async () => {
            await fetchServerData(serverId.id).then(async (serverData) => {
                if (serverData) {
                    setActiveServer(serverData)
                    dispatch(initializeActiveServer(serverData))
                    await fetchServerChannels(serverId.id).then(
                        (channelData) => {
                            setMiddleBarData(channelData)
                            setDataType('server')
                        }
                    )
                }
            })
        }
        getServerData()
    }, [user, serverId])

    return (
        <div className="flex h-[100vh]">
            <Head>
                <title>Discord - {activeServer.serverName}</title>
            </Head>

            <Sidebar />
            <div className="flex items-center w-full h-full">
                <div className="hidden w-[300px] lg:flex lg:h-full">
                    <MiddleBar
                        middleBarData={middleBarData}
                        dataType={dataType}
                        changeActiveChannel={changeActiveChannel}
                        activeChannel={activeChannel}
                    />
                </div>
                <ChatScreen activeChannel={activeChannel} />
            </div>
        </div>
    )
}

export default Chat
