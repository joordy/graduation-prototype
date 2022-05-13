import { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'

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
        <li className="px-4 py-2 shadow-md rounded-xl bg-grey-50">
            <Link
                href={`/projects/${data?.name.toLocaleLowerCase()}/notifications/${
                    data?.slug
                }`}
            >
                <a>
                    <div className="grid grid-cols-[32px_auto] gap-4">
                        <div className="flex items-center justify-center">
                            <img
                                src={data?.projectIcon}
                                alt={`icon of ${data?.projectName}`}
                                className="h-[32px] w-[32px]"
                            />
                        </div>
                        <div className="col-start-2 grid grid-cols-[auto_60px] grid-rows-[auto_20px] gap-2 ">
                            {/* <IssueTitle title={{data?.message}} /> */}

                            <p className="h-6 col-start-1 row-start-1 overflow-hidden font-bold">
                                {data?.service} {data?.message}
                            </p>
                            <PriorityElement priority="High" />
                            <CalculatedTimeAgo date="Thu May 05 2022 13:01:39 GMT+0200 (CEST)" />

                            <p className="row-start-2 text-right">—</p>
                        </div>
                    </div>
                </a>
            </Link>
        </li>
    )
}

const InProgress = ({ data, ...props }) => {
    return (
        <li className="px-2 py-2 shadow-md rounded-xl bg-grey-50">
            <div className="relative grid grid-cols-[36px_auto] place-items-center pb-2">
                <span className="mr-3">
                    <img
                        src={data?.projectIcon}
                        alt={`icon of ${data?.projectName}`}
                    />
                </span>
                <p className="text-md">{data?.intro}</p>
                <p className="absolute bottom-0 right-0 text-xs text-grey-400">
                    {data?.status}
                </p>
            </div>
            {/* <div className="relative flex items-center">
                <div className="flex items-center justify-center w-12 h-12">
                    <img
                        src={data?.projectIcon}
                        alt={`icon of ${data?.projectName}`}
                        // className="w-8 h-8"
                    />
                </div>
                <div className="flex items-center justify-center ml-4">
                    <p>{data?.intro}</p>
                </div>
                <p className="ml-2 text-xs text-right text-grey-300">
                    /* <p className="absolute top-[50%] right-0 -translate-y-[50%] text-xs text-grey-300"> 
                    {data?.status}
                </p>
            </div> */}
        </li>
    )
}

const FixedIssue = ({ data, ...props }) => {
    return (
        <li className="px-4 py-2 shadow-md rounded-xl bg-grey-50">
            <div className="relative grid grid-cols-[36px_auto] place-items-center pb-2">
                <span className="mr-3">
                    <img
                        src={data?.projectIcon}
                        alt={`icon of ${data?.projectName}`}
                    />
                </span>
                <p className="text-md">{data?.intro}</p>
                <p className="absolute bottom-0 right-0 text-xs text-grey-400">
                    {data?.status}
                </p>
            </div>
            {/* <div className="relative flex items-center">
                <div className="flex items-center justify-center">
                    <img
                        src={data?.projectIcon}
                        alt={`icon of ${data?.projectName}`}
                        className="h-[24px] w-[24px]"
                    />
                </div>
                <div className="flex items-center justify-center ml-4">
                    <p>{data?.intro}</p>
                </div>
                <p className="absolute top-[50%] right-0 -translate-y-[50%] text-xs text-grey-300">
                    {data?.status}
                </p>
            </div> */}
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

const CalculatedTimeAgo = ({ date }) => {
    return (
        <p className="row-start-1 text-xs text-right text-grey-500 ">1h ago</p>
    )
}

const PriorityElement = ({ priority = 'urgent' }) => {
    return (
        <span className="col-start-1 row-start-2 flex h-[20px] w-fit flex-col items-center justify-center rounded-md bg-red px-2 text-xs text-white">
            {priority}
        </span>
    )
}

export default Notification
