import Link from 'next/link'

const NotificationPopup = ({
    projectName,
    pathName,
    shortDescription,
    icon,
    ...props
}) => {
    return (
        <Link href={`/${pathName}`}>
            <a>
                <div className="text-['#000'] flex">
                    <div className="mr-4 flex w-[32px] items-center justify-center ">
                        <img src={icon} alt={`Error on ${projectName}`} />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="mb-2 text-2xl font-bold">
                            {projectName}
                        </h1>
                        <p>{shortDescription}</p>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default NotificationPopup
