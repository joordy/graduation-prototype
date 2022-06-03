import { useMemo, useState } from 'react'

import { supabase } from 'utils/database/init'
import { checkIfValueExist } from '_utils/helpers/arrayHelpers'

import Card from '_components/blocks/Card'
import Priority from '_components/blocks/notificationElements/Priority'
import Status from '_components/blocks/notificationElements/Status'
import Title from '_components/blocks/notificationElements/Title'
import Assigned from '_components/blocks/notificationElements/Assigned'

import NotificationPreview from '_components/common/notifications/NotificationPreview'

import Page from '_components/scopes/global/Page'

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
                    <section>
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
                                <ul className="flex flex-col gap-y-2">
                                    {notifications.map((data, i) => {
                                        if (data.status === 'Reported')
                                            return (
                                                <Card
                                                    tag="li"
                                                    key={i}
                                                    className={
                                                        'shadow-md w-full rounded-xl  bg-offWhite px-4 py-3 duration-75 ease-in hover:bg-flashWhite'
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
                                <ul className="flex flex-col gap-y-2">
                                    {notifications.map((data, i) => {
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
                        <article className="flex max-h-[calc(100%-2.5em)] duration-200 ease-in-out ">
                            {currentIndex == null && !results ? (
                                <section className="flex flex-col items-center justify-center w-full p-4 mt-10 bg-white border rounded-lg shadow-md border-flashWhite">
                                    <p>Nothing selected yet...</p>
                                </section>
                            ) : (
                                <NotificationPreview data={results} />
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
