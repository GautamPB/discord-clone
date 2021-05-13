import Image from 'next/image'
import { Circle } from 'better-react-spinkit'

const Loading = () => {
    return (
        <div className="bg-[#202225] grid place-items-center h-screen">
            <div className="flex flex-col items-center">
                <Image width={200} height={150} src="/discord-logo.png" />
                <Circle className="my-8" color="#8B9EFE" size={60} />
            </div>
        </div>
    )
}

export default Loading
