import MessageComponent from './MessageComponent'
import { db } from '../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const MessagesAreaComponent = ({ serverId, channelId }) => {
    const messagesRef = db
        .collection('servers')
        .doc(serverId)
        .collection('channels')
        .doc(channelId)
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
            {/* <MessageComponent
                profilePhoto="https://picjumbo.com/wp-content/uploads/alone-with-his-thoughts-1080x720.jpg"
                userEmail="pbg2402@gmail.com"
                timestamp="07/01/22"
                message="Hello World"
            /> */}
        </div>
    )
}

export default MessagesAreaComponent
