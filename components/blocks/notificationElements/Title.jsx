import { capitalizeFirstLetter } from 'utils/helpers/stringHelpers'

const Title = ({ service = '', message = '' }) => {
    return (
        <p className="w-full h-6 row-start-1 pr-12 overflow-hidden font-bold text-left text-ellipsis whitespace-nowrap">
            {`${capitalizeFirstLetter(service)} ${message}`}
        </p>
    )
}

export default Title
