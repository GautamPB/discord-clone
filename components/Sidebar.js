import { Avatar } from '@material-ui/core'
import { PlusIcon, GlobeIcon } from '@heroicons/react/outline'
import { IconButton } from '@material-ui/core'
import ExploreIcon from '@material-ui/icons/Explore'

const Sidebar = () => {
    return (
        <div className="flex flex-col bg-[#202225] h-screen pt-4 w-[73px] items-center space-y-3">
            <div className="border-b border-gray-700 pb-4 flex items-center">
                <div className="bg-white w-1.5 h-8 rounded-lg absolute left-0" />
                <Avatar />
            </div>

            <div className="flex flex-col space-y-2">
                <IconButton className="bg-gray-500 rounded-full items-center group flex">
                    <div className="bg-[#202225] group-hover:bg-white w-1.5 h-8 rounded-lg absolute left-[-10px]" />
                    <PlusIcon className="text-green-500 h-8" />
                </IconButton>

                <IconButton className="bg-gray-500 rounded-full items-center group">
                    <div className="bg-[#202225] group-hover:bg-white w-1.5 h-8 rounded-lg absolute left-[-10px]" />
                    <ExploreIcon className="text-green-500 h-8" />
                </IconButton>
            </div>
        </div>
    )
}

export default Sidebar
