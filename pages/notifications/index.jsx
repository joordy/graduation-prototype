import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'

import { NOTIFICATION_DATA } from '_utils/database/dataset'
import { supabase } from 'utils/database/init'
import { capitalizeFirstLetter } from 'utils/helpers/stringHelpers'
import {
    checkIfValueExist,
    getValueInArrayCounter,
} from '_utils/helpers/arrayHelpers'

import Card from '_components/blocks/Card'
import Page from '_components/scopes/global/Page'
import IssueBlock from '_components/common/IssueBlock'
import Notification from '_components/common/notifications/Notification'

import Priority from '_components/blocks/notificationElements/Priority'
import Status from '_components/blocks/notificationElements/Status'
import Title from '_components/blocks/notificationElements/Title'
import Assigned from '_components/blocks/notificationElements/Assigned'

import NotificationElement from '_components/blocks/NotificationElement'
import NotificationDetails from '_components/scopes/_NotificationDetails'

const STATUS = [
    {
        index: 6,
        state: 'Moved to BiA QA',
        date: '01-04-2022 — 10:22',
    },
    {
        index: 5,
        state: 'Moved to Mammut QA',
        date: '01-04-2022 — 10:22',
    },
    {
        index: 4,
        state: 'Moved to Ready for release',
        date: '01-04-2022 — 10:22',
    },
    {
        index: 3,
        state: 'Moved to Production',
        date: '01-04-2022 — 10:22',
    },
    {
        index: 2,
        state: 'Currently in Progress',
        date: '02-04-2022 — 9:32',
    },
    {
        index: 1,
        state: 'Reported on backlog',
        date: '01-04-2022 — 10:22',
    },
]

const NotificationCenter = ({ notifications, ...props }) => {
    const [openTab, setOpenTab] = useState(1)
    const [currentIndex, setCurrentIndex] = useState(null)
    const [data, setData] = useState(null)

    const results = useMemo(() => {
        if (currentIndex == null) return

        return notifications[currentIndex]
    }, [currentIndex])

    return (
        <Page topNav={true}>
            <section className="h-[calc(100%-5em)] ">
                <header>
                    <h1 className="mb-8 text-3xl font-bold">
                        Notification center
                    </h1>
                </header>
                <main className="grid h-[inherit] grid-cols-[2fr,3fr] gap-x-8">
                    <section>
                        <h2 className="mb-2 text-xl font-semibold">
                            Open notifications
                        </h2>
                        <ul className="flex gap-4 mb-4">
                            <li>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setOpenTab(1)
                                    }}
                                >
                                    <h3
                                        className={
                                            'text-xs ' +
                                            (openTab === 1
                                                ? ' border-b-2 font-bold'
                                                : '')
                                        }
                                    >
                                        Reported
                                    </h3>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setOpenTab(2)
                                    }}
                                >
                                    <h3
                                        className={
                                            'text-xs ' +
                                            (openTab === 2
                                                ? ' border-b-2 font-bold'
                                                : '')
                                        }
                                    >
                                        In progress
                                    </h3>
                                </button>
                            </li>
                        </ul>

                        <div
                            className={openTab === 1 ? 'block' : 'hidden'}
                            id="link2"
                        >
                            {checkIfValueExist(
                                notifications,
                                'status',
                                'Reported',
                            ) ? (
                                <ul className="flex flex-col gap-y-4">
                                    {notifications.map((data, i) => {
                                        console.log(data)
                                        if (data.status === 'Reported')
                                            return (
                                                <Card
                                                    tag="li"
                                                    key={i}
                                                    className={
                                                        'shadow-md w-full rounded-xl  bg-offWhite p-4 duration-75 ease-in hover:bg-flashWhite'
                                                    }
                                                >
                                                    <button
                                                        onClick={(e) =>
                                                            setCurrentIndex(i)
                                                        }
                                                        className={'w-full'}
                                                    >
                                                        <CardType data={data} />
                                                    </button>
                                                </Card>
                                            )
                                    })}
                                </ul>
                            ) : (
                                <p className="text-xs">{'no notifications'}</p>
                            )}
                        </div>
                        <div
                            className={openTab === 2 ? 'block' : 'hidden'}
                            id="link3"
                        >
                            {checkIfValueExist(
                                notifications,
                                'status',
                                'In progress',
                            ) ? (
                                <ul className="flex flex-col gap-y-4">
                                    {notifications.map((data, i) => {
                                        console.log(data)

                                        if (data.status === 'In progress')
                                            return (
                                                <Card
                                                    tag="li"
                                                    key={i}
                                                    className={
                                                        'shadow-md w-full rounded-xl  bg-offWhite p-4 duration-75 ease-in hover:bg-flashWhite'
                                                    }
                                                >
                                                    <button
                                                        onClick={(e) =>
                                                            setCurrentIndex(i)
                                                        }
                                                        className={'w-full'}
                                                    >
                                                        <CardType data={data} />
                                                    </button>
                                                </Card>
                                            )
                                    })}
                                </ul>
                            ) : (
                                <p className="text-xs">{'no notifications'}</p>
                            )}
                        </div>
                    </section>
                    <section className="overflow-hidden">
                        <article className="mt-9 flex h-[calc(100%-2.5em)]">
                            {currentIndex == null && !results ? (
                                <section className="flex flex-col items-center justify-center w-full p-4 mt-10 bg-white border rounded-lg shadow-md border-flashWhite">
                                    <p>Nothing selected yet...</p>
                                </section>
                            ) : (
                                <SelectedNotification data={results} />
                            )}
                        </article>
                    </section>
                </main>
            </section>
        </Page>
    )
}

const CardType = ({ data }) => {
    return (
        <div className="grid grid-cols-[32px_auto] gap-4">
            <div className="flex items-center justify-center">
                <img
                    src={data?.projectIcon}
                    alt={`icon of ${data?.service} on the ${data?.projectName} project`}
                    className="h-[32px] w-[32px]"
                />
            </div>
            <div className="relative col-start-2 grid grid-rows-[auto_20px] gap-2">
                <Title service={data.service} message={data.message} />
                <Priority priority={data.priorityLevel} />
                <Status status="1h ago" />
                <Assigned assignedTo={data.assignedTo} />
            </div>
        </div>
    )
}

const SelectedNotification = ({ data }) => {
    return (
        <section className="w-full p-4 mt-10 bg-white border rounded-lg shadow-md border-flashWhite">
            <header className="mb-2 flex w-[inherit] flex-col justify-between text-sm">
                <article>
                    <h3 className="text-xl font-bold">Status</h3>

                    <div className="grid grid-cols-2 gap-4 mb-1">
                        <p className="text-grey-500">Detected on</p>
                        <p>{data.projectName}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-1">
                        <p className="text-grey-500">Assigned to</p>
                        <p>Maarten B</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-1">
                        <p className="text-grey-500">Last updated</p>
                        <p>17:14 - 09-05-2022</p>
                    </div>
                    <div className="grid-cols-2 gap-4 mb-1">
                        <p className="text-grey-500">Priority level</p>
                        <Priority />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <p className="text-grey-500">Status</p>
                        <p>In Progress</p>
                    </div>
                </article>
            </header>

            <main>
                <article className="text-sm">
                    <h3 className="text-xl font-bold">Description</h3>

                    <p>{data.intro}</p>
                </article>

                <article className="w-full mt-2">
                    <h3 className="text-xl font-bold">Changelog</h3>
                    <ul className="flex flex-col overflow-y-auto ">
                        {STATUS.map(({ state, date, index }, i) => {
                            return (
                                <li
                                    key={i}
                                    className="flex justify-between text-sm"
                                >
                                    <p>{state}</p>
                                    <p>{date}</p>
                                </li>
                            )
                        })}
                    </ul>
                </article>

                <div className="p-4 pr-8 mt-2 overflow-x-scroll text-xs border border-grey-100 xl:col-start-3 xl:col-end-6">
                    <pre className="mb-8">
                        Error appeared in: {data.specificCodeFile}
                    </pre>

                    {data.errorMessage?.length >= 1 ? (
                        data.errorMessage.map((line, i) => {
                            return (
                                <pre className="text-[10px]" key={i}>
                                    {line}
                                </pre>
                            )
                        })
                    ) : (
                        <pre className="text-xs">no error message</pre>
                    )}
                </div>
            </main>
        </section>
    )
}

export async function getStaticProps() {
    const { data, error } = await supabase.from('notifications').select()

    if (error) {
        console.log(error)
        return { props: {} }
    }
    return {
        props: { notifications: data },
    }
}

export default NotificationCenter
