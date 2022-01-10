import { db } from '../firebase'
import firebase from 'firebase'

//------------------------SERVERS--------------------------------
const createChannel = async (serverId, channelName, userId) => {
    await db
        .collection('servers')
        .doc(serverId)
        .collection('channels')
        .add({
            channelName,
            users: [userId],
        })
        .then((channelRef) => {
            db.collection('servers')
                .doc(serverId)
                .collection('channels')
                .doc(channelRef.id)
                .update({
                    channelId: channelRef.id,
                })
        })
}

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
        .then(async (serverRef) => {
            db.collection('servers').doc(serverRef.id).update({
                serverId: serverRef.id,
            })
            await createChannel(serverRef.id, 'general', ownerId)
        })
}

const getServers = async (userId) => {
    const serverSnapshot = await db
        .collection('servers')
        .where('members', 'array-contains', userId)
        .get()
    // .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         const serverObj = {
    //             id: doc.id,
    //             ...doc.data(),
    //         }
    //         console.log(serverObj)
    //         serverData.push(serverObj)
    //     })
    // })

    const serverData = serverSnapshot.docs.map((serverDoc) => {
        return {
            // id: serverDoc.id,
            ...serverDoc.data(),
        }
    })
    if (serverData) return serverData
    return null
}

const fetchServerData = async (serverId) => {
    const serverSnapshot = await db.collection('servers').doc(serverId).get()

    return serverSnapshot.data()
}

const fetchServerChannels = async (serverId) => {
    const channelsSnapshot = await db
        .collection('servers')
        .doc(serverId)
        .collection('channels')
        .get()

    const channelData = []

    channelsSnapshot.forEach((channelDoc) => {
        const channelObj = {
            id: channelDoc.id,
            ...channelDoc.data(),
        }

        channelData.push(channelObj)
    })

    return channelData
}

const inviteUserToServer = async (serverId, userEmail) => {
    const userRef = await db
        .collection('users')
        .where('email', '==', userEmail)
        .get()

    const userDoc = userRef.docs.map((userDoc) => {
        return {
            id: userDoc.id,
            ...userDoc.data(),
        }
    })

    const userId = userDoc[0].id

    await db
        .collection('servers')
        .doc(serverId)
        .update({
            members: firebase.firestore.FieldValue.arrayUnion(userId),
        })
}

const leaveServer = async (userId, userEmail, serverId) => {
    const serverRef = await db.collection('servers').doc(serverId).get()

    const serverObj = {
        id: serverRef.id,
        ...serverRef.data(),
    }

    if (serverObj.ownerEmail === userEmail) {
        console.log(serverObj)
        if (serverObj.members.length === 1) {
            await db
                .collection('servers')
                .doc(serverId)
                .update({
                    members: firebase.firestore.FieldValue.arrayRemove(userId),
                })
            console.log('User has been removed')
        } else {
            console.log(
                'You are the owner of this server and cannot leave unless you are the only person'
            )
        }
    } else {
        await db
            .collection('servers')
            .doc(serverId)
            .update({
                members: firebase.firestore.FieldValue.arrayRemove(userId),
            })
        console.log('User has been removed')
    }
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

//------------------------MESSAGES--------------------------------
const sendMessage = async (serverId, channelId) => {
    console.log(serverId, channelId)
}

export {
    createServer,
    getCurrentUser,
    getServers,
    fetchServerData,
    fetchServerChannels,
    createChannel,
    inviteUserToServer,
    leaveServer,
    sendMessage,
}
