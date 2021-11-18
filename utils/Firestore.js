import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'

//------------------------SERVERS--------------------------------
const createServer = async (serverName, photoURL) => {
    await db
        .collection('servers')
        .add({
            serverName,
            photoURL,
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

export { createServer, getCurrentUser }