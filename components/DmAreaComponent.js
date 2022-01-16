import MessageComponent from './MessageComponent'
import { db } from '../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const DmAreaComponent = ({ chatId, channelId }) => {
    const messagesRef = db
        .collection('chats')
        .doc(chatId)
        .collection('messages')

    const query = messagesRef.orderBy('timestamp')

    const [messages] = useCollectionData(query, { idField: 'id' })

    return (
        <div className="h-full overflow-y-scroll z-0 space-y-3">
            {messages?.map((message) => (
                <MessageComponent
                    key={message.messageId}
                    messageId={message.messageId}
                    profilePhoto={message.profilePhoto}
                    userEmail={message.userEmail}
                    timestamp={message.timestamp?.toDate().toDateString()}
                    message={message.message}
                    channelId={channelId}
                />
            ))}
        </div>
    )
}

export default DmAreaComponent
