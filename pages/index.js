import { useEffect } from 'react'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import MiddleBar from '../components/MiddleBar'
import ChatScreen from '../components/ChatScreen'
import Login from './login'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch } from 'react-redux'
import { initializeUser } from '../slices/userSlice'
import { getCurrentUser } from '../utils/Firestore'

export default function Home() {
    const [user] = useAuthState(auth)
    const dispatch = useDispatch()

    useEffect(() => {
        getCurrentUser(user.email).then((userData) => {
            dispatch(initializeUser(userData))
        })
    }, [user])

    return (
        <div>
            <Head>
                <title>Discord</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {user ? (
                <div className="flex">
                    <Sidebar />
                    <MiddleBar />
                    <ChatScreen />
                </div>
            ) : (
                <Login />
            )}
        </div>
    )
}
