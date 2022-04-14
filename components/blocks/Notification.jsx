import Link from 'next/link'

const Notification = ({
    slug,
    projectIcon,
    projectName,
    shortDescription,
    ...props
}) => {
    return (
        <li className="rounded-xl bg-white p-4">
            <Link href={`/notifications/${slug}`}>
                <a>
                    <div className="flex">
                        <div className="flex items-center justify-center">
                            <div
                                className={`h-[32px] w-[32px] rounded-lg bg-[#000000]`}
                            ></div>
                            {/* <img
                                src={projectIcon}
                                alt={`icon of ${projectName}`}
                                className="h-[32px] w-[32px]"
                            /> */}
                        </div>
                        <div className="ml-4">
                            <p className="text-xl font-bold">{projectName}</p>
                            <p>{shortDescription}</p>
                        </div>
                    </div>
                </a>
            </Link>
        </li>
    )
}

export default Notification
