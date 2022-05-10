import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'

import { NOTIFICATION_DATA } from '_utils/database/dataset'

import Page from '_components/scopes/Page'
import NotificationElement from '_components/blocks/NotificationElement'
import NotificationDetails from '_components/scopes/NotificationDetails'

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
    const [currentIndex, setCurrentIndex] = useState(null)
    const [data, setData] = useState(null)

    const results = useMemo(() => {
        // console.log(typeof currentIndex)
        console.log(notifications[currentIndex])

        if (currentIndex == null) return

        return notifications[currentIndex]
    }, [currentIndex])

    console.log('currentIndex', currentIndex == null)
    console.log('results', results)
    // const onHandleClick = useCallback((i) => {
    //     // console.log(i)
    //     // console.log(notifications)

    //     console.log(notifications[i])
    //     setData(notifications[i])
    // }, [])

    // console.log(results)

    return (
        <Page topNav={true}>
            <section className="h-[calc(100%-5em)] ">
                <header>
                    <h1 className="mb-8 text-3xl font-bold">
                        Notification center
                    </h1>
                </header>
                <main className="grid h-[inherit] grid-cols-[2fr,3fr] gap-3">
                    <section>
                        <h2 className="mb-2 text-xl font-semibold">
                            Open notifications
                        </h2>
                        <ul className="flex flex-col gap-y-4">
                            {notifications &&
                                notifications.map((data, i) => {
                                    return (
                                        <li className="rounded-xl bg-grey-50">
                                            <button
                                                className="w-full p-4 text-left"
                                                onClick={(e) =>
                                                    setCurrentIndex(i)
                                                }
                                                aria-label={i}
                                            >
                                                <div className="relative flex">
                                                    <div className="flex items-center justify-center">
                                                        <img
                                                            src={
                                                                data.projectIcon
                                                            }
                                                            alt={`icon of ${data.projectName}`}
                                                            className="h-[32px] w-[32px]"
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <p className="text-xl font-bold">
                                                            {data.projectName}
                                                        </p>
                                                        <p>{data.intro}</p>
                                                    </div>
                                                    <p className="absolute top-0 right-0 text-xs text-grey-300">
                                                        {data.status}
                                                    </p>
                                                </div>
                                            </button>
                                        </li>
                                    )
                                })}
                        </ul>
                    </section>
                    <section className="overflow-hidden">
                        <article className="mt-9 flex h-[calc(100%-2.5em)]">
                            {currentIndex == null && !results ? (
                                <section className="flex flex-col items-center justify-center w-full p-1 border rounded-lg shadow-md border-grey-100">
                                    <p>Nothing selected yet...</p>
                                </section>
                            ) : (
                                <Notification data={results} />
                            )}
                        </article>
                    </section>
                </main>
            </section>
        </Page>
    )
}

const Notification = ({ data }) => {
    console.log(data)
    return (
        <section className="w-full p-1 border rounded-lg shadow-md border-grey-100">
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
                    <div className="grid grid-cols-2 gap-4 mb-1">
                        <p className="text-grey-500">Priority level</p>
                        <PriorityElement />
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

const PriorityElement = ({ priority = 'Urgent' }) => {
    return (
        <span className="flex h-[20px] w-fit flex-col items-center justify-center rounded-md bg-red px-2 text-xs text-white">
            {priority}
        </span>
    )
}

export async function getStaticProps() {
    const data = NOTIFICATION_DATA

    return {
        props: { notifications: data },
    }
}

export default NotificationCenter
