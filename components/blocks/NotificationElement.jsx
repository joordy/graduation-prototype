import Link from 'next/link'

const Notification = ({ type = '', hit, projectSlug }) => {
    const { name, projectName, projectIcon, slug, intro, status } = hit

    return (
        <li className="p-4 rounded-xl bg-grey-50">
            <Link href={`/notifications/${slug}`}>
                <a>
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
                                <p className="text-xl font-bold">
                                    {projectName}
                                </p>
                                <p>{intro}</p>
                            </div>
                            <p className="absolute top-0 right-0 text-xs text-grey-300">
                                {status}
                            </p>
                        </div>
                    )}
                </a>
            </Link>
        </li>
    )
}

export default Notification
