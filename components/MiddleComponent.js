import { Avatar } from '@material-ui/core'

const MiddleComponent = ({ image, title }) => {
    return (
        <div className="flex items-center space-x-2 group">
            <Avatar src={image} alt={title} />
            <p className="text-gray-400 group-hover:text-white cursor-pointer">
                {title}
            </p>
        </div>
    )
}

export default MiddleComponent
