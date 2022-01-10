import MessageComponent from './MessageComponent'

const MessagesComponent = ({ serverId, channelId }) => {
    console.log(serverId, channelId)

    return (
        <div>
            <MessageComponent
                profilePhoto="https://picjumbo.com/wp-content/uploads/alone-with-his-thoughts-1080x720.jpg"
                userEmail="pbg2402@gmail.com"
                timestamp="07/01/22"
                message="Hello World"
            />
        </div>
    )
}

export default MessagesComponent
