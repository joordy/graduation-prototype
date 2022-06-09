import Link from 'next/link'

import Card from '_components/blocks/Card'
import Priority from '_components/blocks/notificationElements/Priority'
import Status from '_components/blocks/notificationElements/Status'
import Title from '_components/blocks/notificationElements/Title'
import Assigned from '_components/blocks/notificationElements/Assigned'

const Notification = ({
    notificationType,
    linked,
    data,
    background,
    onClick,
    projectIcon = false,
}) => {
    return (
        <ReportedNotification
            imgType={notificationType}
            linked={linked}
            data={data}
            background={background}
            onClick={onClick}
            projectIcon={projectIcon}
        />
    )
}

const ReportedNotification = ({
    onClick,
    data,
    imgType,
    linked,
    background,
}) => {
    const img = imgType === 'projectImg' ? data?.projectIcon : data?.serviceIcon

    return (
        <Card
            tag="li"
            className={
                'mx-1 w-[inherit] rounded-lg bg-white p-4 shadow-sm shadow-slate-300 duration-75 ease-in hover:bg-slate-200 ' +
                background
            }
            onClick={onClick}
        >
            {linked ? (
                <Link
                    href={`/projects/${data?.name.toLocaleLowerCase()}/notifications/${
                        data?.slug
                    }`}
                >
                    <a>
                        <div className="grid grid-cols-[32px_auto] gap-4">
                            <div className="flex items-center justify-center">
                                <img
                                    src={img}
                                    alt={`icon of ${data?.service} on the ${data?.projectName} project`}
                                    className="h-[32px] w-[32px] grayscale filter"
                                />
                            </div>
                            <div className="relative col-start-2 grid grid-rows-[auto_20px] gap-1">
                                <Title
                                    service={data.service}
                                    message={data.message}
                                />
                                <Priority priority={data.priorityLevel} />
                                <Status status="1h ago" />
                                <Assigned assignedTo={data.assignedTo} />
                            </div>
                        </div>
                    </a>
                </Link>
            ) : (
                <div className="grid grid-cols-[32px_auto] gap-4">
                    <div className="flex items-center justify-center">
                        <img
                            src={img}
                            alt={`icon of ${data?.service} on the ${data?.projectName} project`}
                            className="h-[32px] w-[32px] grayscale filter"
                        />
                    </div>
                    <div className="relative col-start-2 grid grid-rows-[auto_20px] gap-1">
                        <Title service={data.service} message={data.message} />
                        <Priority priority={data.priorityLevel} />
                        <Status status="1h ago" />
                        <Assigned assignedTo={data.assignedTo} />
                    </div>
                </div>
            )}
        </Card>
    )
}

export default Notification
