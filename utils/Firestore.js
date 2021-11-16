import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'

// SERVERS
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

export { createServer }
