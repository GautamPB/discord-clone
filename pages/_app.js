import { useEffect } from 'react'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import firebase from 'firebase'
import { db, auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loading from '../components/Loading'
import Login from './login'

function MyApp({ Component, pageProps }) {
    const [user, loading] = useAuthState(auth)

    useEffect(() => {
        if (user) {
            db.collection('users').doc(user.uid).set(
                {
                    email: user.email,
                    photoURL: user.photoURL,
                },
                { merge: true }
            )
        }
    }, [user])

    if (loading) {
        return <Loading />
    }
    if (!user) {
        return <Login />
    }

    return <Component {...pageProps} />
}

export default MyApp
