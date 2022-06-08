import Link from 'next/link'
import { capitalizeFirstLetter } from '_utils/helpers/stringHelpers'

const Popup = ({
    message,
    linked = false,
    pathName,
    intro,
    icon,
    ...props
}) => {
    return linked ? (
        <Link href={`/${pathName}`}>
            <a>
                <div className="flex text-grey-900">
                    <div className="flex flex-col">
                        <h1 className="mb-2 text-2xl font-bold">{message}</h1>
                        <p>{intro}</p>
                    </div>
                </div>
            </a>
        </Link>
    ) : (
        <div className="flex items-center w-full text-grey-900">
            <div className="mr-2">
                <img className="w-8" src={icon} />
            </div>
            <div className="flex flex-col">
                <h1 className="mb-1 text-[14px] font-bold text-gray-600">
                    {capitalizeFirstLetter(message)}
                </h1>
                <p className="text-[14px]">{capitalizeFirstLetter(intro)}</p>
            </div>
        </div>
    )
}

export default Popup
