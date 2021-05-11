import Head from 'next/head'
import Image from 'next/image'
import { auth, provider } from '../firebase'
import { Button } from '@material-ui/core'

const login = () => {
    const handleSignIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }

    return (
        <div className="bg-[#202225] h-screen grid place-items-center">
            <Head>
                <title>Login</title>
            </Head>

            <div className="flex flex-col items-center bg-[#36393F] p-20 rounded-2xl shadow-xl justify-center space-y-3">
                <Image src="/discord-logo.png" width={200} height={150} />
                <Button onClick={handleSignIn}>
                    <p className="text-white font-bold text-sm">
                        Login with Google
                    </p>
                </Button>
            </div>
        </div>
    )
}

export default login
