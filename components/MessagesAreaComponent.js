import MessageComponent from './MessageComponent'

const MessagesAreaComponent = ({ serverId, channelId }) => {
    console.log(serverId, channelId)

    return (
        <div className="h-full overflow-y-scroll z-0">
            <MessageComponent
                profilePhoto="https://picjumbo.com/wp-content/uploads/alone-with-his-thoughts-1080x720.jpg"
                userEmail="pbg2402@gmail.com"
                timestamp="07/01/22"
                message="Hello World"
            />
        </div>
    )
}

export default MessagesAreaComponent
