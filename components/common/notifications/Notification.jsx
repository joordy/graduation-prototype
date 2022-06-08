import { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'

import { capitalizeFirstLetter } from 'utils/helpers/stringHelpers'

import Card from '_components/blocks/Card'
import Priority from '_components/blocks/notificationElements/Priority'
import Status from '_components/blocks/notificationElements/Status'
import Title from '_components/blocks/notificationElements/Title'
import Assigned from '_components/blocks/notificationElements/Assigned'

const Notification = ({
    notificationType,
    linked,
    data,
    type,
    background,
    onClick,
    ...props
}) => {
    const NotificationType = ({ type }) => {
        switch (type) {
            case 'inProgress':
                return <InProgress data={data} />
            case 'solved':
                return <FixedIssue data={data} />
            default:
                return (
                    <NewNotification
                        notificationType={notificationType}
                        linked={linked}
                        data={data}
                        background={background}
                        onClick={onClick}
                    />
                )
        }
    }

    return <NotificationType type={type} />
}

const NewNotification = ({
    onClick,
    data,
    notificationType,
    linked,
    background,
    ...props
}) => {
    const img =
        notificationType === 'projectImg'
            ? data?.projectIcon
            : data?.serviceIcon

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
                                    className="h-[32px] w-[32px] opacity-40"
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
                            className="h-[32px] w-[32px] opacity-40"
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

const InProgress = ({ data, ...props }) => {
    return (
        <Card tag="li">
            <Link
                href={`/projects/${data?.name.toLocaleLowerCase()}/notifications/${
                    data?.slug
                }`}
            >
                <a>
                    <div className="grid grid-cols-[32px_auto] gap-4">
                        <div className="flex items-center justify-center">
                            <img
                                src={data?.serviceIcon}
                                alt={`icon of ${data?.serviceIcon} on the ${data?.projectName} project`}
                                className="h-[32px] w-[32px] opacity-40"
                            />
                        </div>
                        <div className="relative col-start-2 grid grid-rows-[auto_20px] gap-2">
                            <Title
                                service={data.service}
                                message={data.message}
                            />
                            <PriorityElement priority="Low" />
                            <CurrentStatus status="8h ago" />
                            <AssignedTo assignedTo={data.assignedTo} />
                        </div>
                    </div>
                </a>
            </Link>
        </Card>
    )
}

const FixedIssue = ({ data, ...props }) => {
    return (
        <Card tag="li">
            <Link
                href={`/projects/${data?.name.toLocaleLowerCase()}/notifications/${
                    data?.slug
                }`}
            >
                <a>
                    <div className="grid grid-cols-[32px_auto] gap-4">
                        <div className="flex items-center justify-center">
                            <img
                                src={data?.serviceIcon}
                                alt={`icon of ${data?.serviceIcon} on the ${data?.projectName} project`}
                                className="h-[32px] w-[32px] opacity-40"
                            />
                        </div>
                        <div className="relative col-start-2 grid grid-rows-[auto_20px] gap-2">
                            <Title
                                service={data.service}
                                message={data.message}
                            />
                            <PriorityElement priority="Low" />
                            <CurrentStatus status="Solved" />

                            <p className="row-start-2 text-right bg-brightGray">
                                {data.assignedTo ? data.assignedTo : '—'}
                            </p>
                        </div>
                    </div>
                </a>
            </Link>
        </Card>
    )
}

export default Notification
