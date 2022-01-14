import { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import { useRouter } from 'next/router'
import getChats from '../utils/getChats'
import { fetchRecipientData } from '../utils/Firestore'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const MiddleComponent = ({ id, users }) => {
    const [user] = useAuthState(auth)

    const router = useRouter()

    const [recipient, setRecipient] = useState()

    useEffect(() => {
        const recipientData = getChats(users, user.email)
        fetchRecipientData(recipientData).then((recipientInfo) => {
            setRecipient(recipientInfo)
        })
    }, [])

    return (
        <div
            className="flex items-center space-x-2 group hover:bg-[#36393F] cursor-pointer px-4 py-2 rounded-lg"
            onClick={() => router.push(`/dm/${id}`)}
        >
            <Avatar src={recipient.photoURL ? recipient.photoURL : ''} />
            <p className="text-gray-400 group-hover:text-white cursor-pointer">
                {recipient.email}
            </p>
        </div>
    )
}

export default MiddleComponent
