import Link from 'next/link'

const Notification = ({ hit }) => {
    console.log(hit)

    const { name, projectName, projectIcon, slug, intro } = hit

    return (
        <li className="p-4 bg-white rounded-xl">
            <Link href={`/notifications/${slug}`}>
                <a>
                    <div className="flex">
                        <div className="flex items-center justify-center">
                            <div
                                className={`h-[32px] w-[32px] rounded-lg bg-grey-900`}
                            ></div>
                            {/* <img
                                src={projectIcon}
                                alt={`icon of ${projectName}`}
                                className="h-[32px] w-[32px]"
                            /> */}
                        </div>
                        <div className="ml-4">
                            <p className="text-xl font-bold">{projectName}</p>
                            <p>{intro}</p>
                        </div>
                    </div>
                </a>
            </Link>
        </li>
    )
}

export default Notification
