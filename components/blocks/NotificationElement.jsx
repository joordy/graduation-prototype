import Link from 'next/link'

const Notification = ({ type = '', hit, onClick = () => {}, projectSlug }) => {
    const { name, projectName, projectIcon, slug, intro, status } = hit

    return (
        <li className="rounded-xl bg-grey-50">
            <button className="w-full p-4 text-left" onClick={onClick}>
                {type === 'fixed' ? (
                    <div className="relative flex">
                        <div className="flex items-center justify-center">
                            <img
                                src={projectIcon}
                                alt={`icon of ${projectName}`}
                                className="h-[32px] w-[32px]"
                            />
                        </div>
                        <div className="flex items-center justify-center ml-4">
                            <p>{intro}</p>
                        </div>
                        <p className="absolute top-0 right-0 text-xs text-grey-300">
                            {status}
                        </p>
                    </div>
                ) : (
                    <div className="relative flex">
                        <div className="flex items-center justify-center">
                            <img
                                src={projectIcon}
                                alt={`icon of ${projectName}`}
                                className="h-[32px] w-[32px]"
                            />
                        </div>
                        <div className="ml-4">
                            <p className="text-xl font-bold">{projectName}</p>
                            <p>{intro}</p>
                        </div>
                        <p className="absolute top-0 right-0 text-xs text-grey-300">
                            {status}
                        </p>
                    </div>
                )}
            </button>
        </li>
    )
}

export default Notification
