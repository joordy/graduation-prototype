import { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'

import { capitalizeFirstLetter } from 'utils/helpers/stringHelpers'

import Card from '_components/blocks/Card'
import Priority from '_components/blocks/notificationElements/Priority'
import Status from '_components/blocks/notificationElements/Status'
import Title from '_components/blocks/notificationElements/Title'
import Assigned from '_components/blocks/notificationElements/Assigned'

const Notification = ({ notificationType, linked, data, type, ...props }) => {
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
                    />
                )
        }
    }

    return <NotificationType type={type} />
}

const NewNotification = ({ data, notificationType, linked, ...props }) => {
    const img =
        notificationType === 'projectImg'
            ? data?.projectIcon
            : data?.serviceIcon

    return (
        <Card
            tag="li"
            className={
                'shadow-md w-full rounded-xl  bg-offWhite px-4 py-2 duration-75 ease-in hover:bg-flashWhite'
            }
        >
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
                                className="h-[32px] w-[32px]"
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
        </Card>
    )
}

const InProgress = ({ data, ...props }) => {
    // console.log(data)
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
                                className="h-[32px] w-[32px]"
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
                                className="h-[32px] w-[32px]"
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

// const Title = ({ service = '', message = '' }) => {
//     return (
//         <p className="w-full h-6 row-start-1 pr-12 overflow-hidden font-bold text-ellipsis whitespace-nowrap">
//             {`${capitalizeFirstLetter(service)} ${message}`}
//         </p>
//     )
// }

// const CurrentStatus = ({ status }) => {
//     return (
//         <p className="absolute row-start-1 text-xs text-right text-grey-500 top-1 -right-1 ">
//             {status}
//         </p>
//     )
// }

// const PriorityElement = ({ priority = 'urgent' }) => {
//     return (
//         <span
//             className={
//                 'col-start-1 row-start-2 flex h-[20px] w-fit flex-col items-center justify-center rounded-md  px-2 text-xs text-white ' +
//                 (priority == 1
//                     ? 'bg-[red]'
//                     : priority == 2
//                     ? 'bg-[orange]'
//                     : 'bg-raisinBlack')
//             }
//         >
//             {priority == 1 ? 'High' : priority == 2 ? 'Medium' : 'Low'}
//         </span>
//     )
// }

// const AssignedTo = ({ assignedTo }) => {
//     return (
//         <p className="absolute flex flex-col items-center justify-center w-6 h-6 row-start-2 text-sm text-right rounded-full z-1 bg-grey-100 text-grey-900 group -right-1 -bottom-1">
//             {assignedTo ? assignedTo.charAt(0) : '—'}
//             <span
//                 className={
//                     'invisible absolute bottom-5 right-0 z-10 -ml-6 w-36 rounded-md bg-[#555] px-1 py-2 text-center text-xs text-white opacity-0 duration-200 ease-in ' +
//                     'after:top:[50%] after:border-grey-600 after:absolute after:right-0 after:-ml-[5px] after:border-2 after:border-solid after:content-none ' +
//                     'group-hover:visible group-hover:opacity-100'
//                 }
//             >
//                 Assigned to: {assignedTo ? assignedTo : 'Nobody'}
//             </span>
//         </p>
//     )
// }

export default Notification
