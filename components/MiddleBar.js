//render DMs first.
//render channels once server has been selected.
import { Avatar } from '@material-ui/core'

import MiddleComponent from './MiddleComponent'

const MiddleBar = () => {
    return (
        <div className="bg-[#33363C] w-[300px] p-4 hidden lg:inline-block items-center space-y-3">
            <div className="space-y-3">
                <input
                    placeholder="Find or start a conversation"
                    className="bg-[#202225] rounded-lg px-2 py-1 text-sm w-full text-white"
                />

                <p className="font-bold text-[12px] text-gray-400">
                    DIRECT MESSAGES
                </p>
            </div>

            <div className="space-y-4">
                <MiddleComponent
                    image="https://cdn.britannica.com/54/188754-050-A3613741/Elon-Musk-2010.jpg"
                    title="Gautam PB"
                />

                <MiddleComponent
                    image="https://cdn.britannica.com/54/188754-050-A3613741/Elon-Musk-2010.jpg"
                    title="Roshan Jose"
                />

                <MiddleComponent
                    image="https://cdn.britannica.com/54/188754-050-A3613741/Elon-Musk-2010.jpg"
                    title="Nishanth Navada"
                />

                <MiddleComponent
                    image="https://cdn.britannica.com/54/188754-050-A3613741/Elon-Musk-2010.jpg"
                    title="Pranav Satyababu"
                />
            </div>
        </div>
    )
}

export default MiddleBar
