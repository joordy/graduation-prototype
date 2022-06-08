import { useMemo, useState } from 'react'

import { supabase } from 'utils/database/init'
import { checkIfValueExist } from '_utils/helpers/arrayHelpers'

import Card from '_components/blocks/Card'
import Priority from '_components/blocks/notificationElements/Priority'
import Status from '_components/blocks/notificationElements/Status'
import Title from '_components/blocks/notificationElements/Title'
import Assigned from '_components/blocks/notificationElements/Assigned'
import IssueBlock from '_components/common/IssueBlock'
import Notification from '_components/common/notifications/Notification'

import NotificationPreview from '_components/common/notifications/NotificationPreview'

import Page from '_components/scopes/global/Page'
import EmptyState from '_components/blocks/icons/Empty'

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
            <section className="mb-24 desktop:mb-0 desktop:h-[calc(100%-5em)]">
                <header>
                    <h1 className="mb-8 text-3xl font-bold">
                        Notification center
                    </h1>
                </header>
                <main className="h-[inherit] gap-x-8 desktop:grid desktop:grid-cols-[2fr,3fr]">
                    <section className="p-4 bg-white rounded-lg shadow-sm shadow-slate-300">
                        <ul className="flex gap-4 mb-2 ml-1">
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
                                                ? ' border-b-2 border-b-slate-800 font-bold text-slate-800'
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
                                                ? ' border-b-2 border-b-slate-800 font-bold text-slate-800'
                                                : '')
                                        }
                                    >
                                        In progress
                                    </h3>
                                </button>
                            </li>
                        </ul>

                        <div
                            className={
                                'h-full ' + (openTab === 1 ? 'block' : 'hidden')
                            }
                        >
                            {checkIfValueExist(
                                notifications,
                                'status',
                                'Reported',
                            ) ? (
                                <ul
                                    className={
                                        'flex h-full flex-col gap-y-3 overflow-y-auto px-0 pt-2 '
                                    }
                                >
                                    {notifications.map((data, i) => {
                                        if (data.status === 'Reported')
                                            return (
                                                <Notification
                                                    onClick={(e) =>
                                                        setCurrentIndex(i)
                                                    }
                                                    linked={false}
                                                    notificationType={
                                                        'Reported'
                                                    }
                                                    data={data}
                                                    key={i}
                                                />
                                            )
                                    })}
                                </ul>
                            ) : (
                                <p className="pt-2 ml-1 text-xs">
                                    Currently nothing reported.
                                </p>
                            )}
                        </div>

                        <div
                            className={
                                'h-full ' + (openTab === 2 ? 'block' : 'hidden')
                            }
                        >
                            {checkIfValueExist(
                                notifications,
                                'status',
                                'In progress',
                            ) ? (
                                <ul
                                    className={
                                        'flex h-full flex-col gap-y-3 overflow-y-auto px-0 pt-2 '
                                    }
                                >
                                    {notifications.map((data, i) => {
                                        if (data.status === 'In progress')
                                            return (
                                                <Notification
                                                    onClick={(e) =>
                                                        setCurrentIndex(i)
                                                    }
                                                    linked={false}
                                                    notificationType={
                                                        'In progress'
                                                    }
                                                    data={data}
                                                    key={i}
                                                />
                                            )
                                    })}
                                </ul>
                            ) : (
                                <p className="pt-2 ml-1 text-xs">
                                    Currently no notifications in progress.
                                </p>
                            )}
                        </div>
                    </section>
                    <section className="flex duration-200 ease-in-out ">
                        {currentIndex == null && !results ? (
                            <section className="flex flex-col items-center justify-center w-full px-4 py-24 rounded-lg shadow-md border-flashWhite">
                                <div className="">
                                    <EmptyState styles={'w-48'} />
                                </div>
                                <p>No notification selected yet...</p>
                            </section>
                        ) : (
                            <NotificationPreview data={results} />
                        )}
                    </section>
                </main>
            </section>
        </Page>
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
