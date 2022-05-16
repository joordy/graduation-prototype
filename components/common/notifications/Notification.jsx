import { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'

import { capitalizeFirstLetter } from 'utils/helpers/stringHelpers'

const Notification = ({ data, type, ...props }) => {
    const NotificationType = ({ type }) => {
        switch (type) {
            case 'inProgress':
                return <InProgress data={data} />
            case 'solved':
                return <FixedIssue data={data} />
            default:
                return <NewNotification data={data} />
        }
    }

    return <NotificationType type={type} />
}

const NewNotification = ({ data, ...props }) => {
    return (
        <li className="px-4 py-3 shadow-md rounded-xl bg-grey-50">
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
                            {/* <IssueTitle title={{data?.message}} /> */}

                            <p className="w-full h-6 row-start-1 pr-8 overflow-hidden font-bold text-ellipsis whitespace-nowrap">
                                {`${capitalizeFirstLetter(data?.service)} ${
                                    data.message
                                }`}
                            </p>
                            <PriorityElement priority="High" />
                            <CurrentStatus status="1h ago" />

                            <p className="row-start-2 text-right">—</p>
                        </div>
                    </div>
                </a>
            </Link>
        </li>
    )
}

const InProgress = ({ data, ...props }) => {
    console.log(data)
    return (
        <li className="relative px-4 py-2 shadow-md rounded-xl bg-grey-50">
            <Link href="#">
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
                            <p className="w-full h-6 row-start-1 pr-8 overflow-hidden font-bold text-ellipsis whitespace-nowrap">
                                {`${capitalizeFirstLetter(data?.service)} ${
                                    data.message
                                }`}
                            </p>
                            <PriorityElement priority="Low" />
                            <CurrentStatus status="8h ago" />

                            <p className="row-start-2 text-right">—</p>
                        </div>
                    </div>
                </a>
            </Link>
        </li>
    )
}

const FixedIssue = ({ data, ...props }) => {
    return (
        <li className="px-4 py-2 shadow-md rounded-xl bg-grey-50">
            <Link href="#">
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
                            <p className="w-full h-6 row-start-1 pr-8 overflow-hidden font-bold text-ellipsis whitespace-nowrap">
                                {data.intro}
                            </p>
                            <PriorityElement priority="Low" />
                            <CurrentStatus status="Solved" />

                            <p className="row-start-2 text-right">—</p>
                        </div>
                    </div>
                </a>
            </Link>
        </li>
    )
}

const IssueTitle = ({ title }) => {
    return (
        <p className="h-6 col-start-1 row-start-1 overflow-hidden font-bold">
            {title}
        </p>
    )
}

const CurrentStatus = ({ status }) => {
    return (
        <p className="absolute row-start-1 text-xs text-right top-1 -right-1 text-grey-500 ">
            {status}
        </p>
    )
}

const PriorityElement = ({ priority = 'urgent' }) => {
    return (
        <span
            className={
                'col-start-1 row-start-2 flex h-[20px] w-fit flex-col items-center justify-center rounded-md  px-2 text-xs text-white ' +
                (priority == 'High'
                    ? 'bg-red'
                    : priority == 'Low'
                    ? 'bg-grey-800'
                    : 'bg-hotpink')
            }
        >
            {priority}
        </span>
    )
}

export default Notification
