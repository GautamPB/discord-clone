import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'

//------------------------SERVERS--------------------------------
const createServer = async (
    serverName,
    photoURL,
    ownerId,
    ownerName,
    ownerEmail
) => {
    await db
        .collection('servers')
        .add({
            serverName,
            photoURL,
            ownerId,
            ownerName,
            ownerEmail,
            members: [ownerId],
        })
        .then((serverRef) => {
            db.collection('servers')
                .doc(serverRef.id)
                .collection('channels')
                .add({
                    channelName: 'general',
                })
        })
}

const getServers = async (userId) => {
    console.log('Get the servers of ' + userId)
}

//------------------------USERS--------------------------------
const getCurrentUser = async (email) => {
    const userSnapshot = await db
        .collection('users')
        .where('email', '==', email)
        .get()

    const doc = userSnapshot.docs.map((userDoc) => {
        return {
            id: userDoc.id,
            ...userDoc.data(),
        }
    })

    return doc[0]
}

export { createServer, getCurrentUser, getServers }
