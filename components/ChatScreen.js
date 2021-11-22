const ChatScreen = () => {
    return (
        <div className="bg-[#36393F] w-full text-white px-2 h-full relative">
            <h1 className="shadow px-2 py-4 z-50">Chat Screen</h1>

            <div className="w-full overflow-y-scroll z-0 h-[88%] flex flex-col">
                <h1>Message Tab</h1>
            </div>

            <div className="w-[99%] absolute bottom-2 bg-[#36393F] z-50">
                <input
                    type="text"
                    placeholder="Type a message"
                    className="border-none outline-none rounded-md p-2 w-full bg-[#40444B]"
                />
            </div>
        </div>
    )
}

export default ChatScreen
