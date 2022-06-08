import Link from 'next/link'

import Alert from '_components/blocks/icons/Alert'

const NotificationCenter = ({ query, toggledHeader, elementsCount }) => {
    return (
        <Link href="/notifications">
            <a
                className={`m-0 flex max-h-[100%] items-center overflow-hidden rounded-lg ${
                    toggledHeader ? 'w-[48px] pl-0' : 'w-full pl-[0]'
                } duration-[250ms] ease-in hover:cursor-pointer hover:bg-brightGray`}
            >
                <div
                    className={`relative flex w-full flex-row  items-center rounded-lg  p-2 text-sm  ${
                        query && 'bg-brightGray'
                    }`}
                >
                    <span className="flex flex-col items-center justify-center w-6 h-6 p-1 m-1 rounded-full stroke-grey-800 ">
                        <Alert />
                    </span>
                    <p className="ml-2 w-max min-w-[125px] overflow-hidden text-sm">
                        Notification center
                    </p>
                    {elementsCount >= 1 && (
                        <span
                            className={`${
                                toggledHeader
                                    ? 'delay-50 opacity-0'
                                    : 'opacity-100 delay-200'
                            } absolute top-[50%] right-3 flex  h-5 w-5 -translate-y-[50%] items-center justify-center rounded-md bg-brightGray text-[10px] shadow-lg duration-150 ease-in`}
                        >
                            {elementsCount}
                        </span>
                    )}
                </div>
            </a>
        </Link>
    )
}

export default NotificationCenter
