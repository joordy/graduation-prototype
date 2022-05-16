import { useEffect, useState } from 'react'
import Select from 'react-select'
import Head from 'next/head'

import { useAuth } from '_utils/context/auth'
import { supabase } from '_utils/database/init'
import { NOTIFICATION_DATA, PROJECT_DATA } from '_utils/database/dataset'
import { useSetUserData, useUserData } from '_utils/atoms/userData'

import Page from '_components/scopes/global/Page'
import Notification from '_components/common/notifications/Notification'

const TEST_DATA = {
    projectName: 'Mammut',
    projectIcon: '/icons/mammut.ico',
    name: 'mammut',
    slug: '18_04_2022_0001',
    intro: 'Vercel can`t reach the website',
    status: 'Solved problem',
    errorMessage: `
        StatusCode 500 - Internal server Error`,
    specificCodeFile: '—',
    codeFunction: '',
    codeLine: '',
    priorityLevel: '',
}

const Project = ({ notifications = [], projects = {}, user, ...props }) => {
    const { connections = [], projectName } = projects
    const userData = useUserData()
    const setUserData = useSetUserData()

    useEffect(() => {
        setUserData(user?.data)
    }, [user?.data])

    const [selectedValue, setSelectedValue] = useState(null)

    const filterOptions = [
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
        { value: 'all', label: 'All' },
    ]

    const handleChange = (e) => {
        setSelectedValue(e.value)
    }

    return (
        <>
            <Head>
                <title>{projectName} — Uptime Tracker</title>
            </Head>

            <Page topNav={true}>
                <section className="h-[calc(100%-3em)]">
                    <header>
                        <h1 className="text-3xl font-bold ">{projectName}</h1>
                    </header>

                    <main className="h-[inherit] lg:grid lg:grid-cols-1 lg:grid-rows-2 lg:gap-x-4">
                        <aside className="lg:grid lg:grid-cols-3 lg:grid-rows-[48px_auto] lg:gap-x-4">
                            <aside className="flex items-center justify-between lg:col-start-1 lg:col-end-5 lg:row-start-1">
                                <h2 className="text-xl font-bold">Issues</h2>

                                <form action="">
                                    <Select
                                        options={filterOptions}
                                        value={
                                            selectedValue
                                                ? filterOptions.find(
                                                      (obj) =>
                                                          obj.value ===
                                                          selectedValue,
                                                  )
                                                : filterOptions[2]
                                        }
                                        onChange={handleChange}
                                        className="text-xs"
                                    />
                                </form>
                            </aside>

                            <aside className="lg:row-start-2 lg:row-end-3">
                                <h2 className="mb-2 font-[500]">Recent:</h2>

                                <ul className="flex flex-col gap-y-4">
                                    {notifications.length >= 1 ? (
                                        notifications.map((data, i) => {
                                            if (data.status === 'Reported')
                                                return (
                                                    <Notification
                                                        data={data}
                                                        key={i}
                                                    />
                                                )
                                        })
                                    ) : (
                                        <li className="text-xs">
                                            No notifications in progress yet.
                                        </li>
                                    )}
                                </ul>
                            </aside>

                            <aside className="lg:col-start-2 lg:row-start-2 lg:row-end-3">
                                <h2 className="mb-2 font-[500]">In progress</h2>

                                <ul className="flex flex-col gap-y-4">
                                    {notifications.includes(
                                        notifications.status === 'In progress',
                                    ) ? (
                                        notifications.map((data, i) => {
                                            if (data.status === 'In progress')
                                                return (
                                                    <Notification
                                                        data={data}
                                                        type="inProgress"
                                                        key={i}
                                                    />
                                                )
                                        })
                                    ) : (
                                        <li className="text-xs">
                                            No notifications in progress yet.
                                        </li>
                                    )}
                                </ul>
                            </aside>

                            <aside className="lg:row-start-2 lg:row-end-3">
                                <h2 className="mb-2 font-[500]">
                                    Solved issues
                                </h2>

                                <ul className="flex flex-col gap-y-4">
                                    {notifications.includes(
                                        notifications.status === 'Solved',
                                    ) ? (
                                        notifications.map((data, i) => {
                                            if (data.status === 'Solved')
                                                return (
                                                    <Notification
                                                        data={data}
                                                        type="solved"
                                                        key={i}
                                                    />
                                                )
                                        })
                                    ) : (
                                        <li className="text-xs">
                                            No solved notifications yet.
                                        </li>
                                    )}
                                </ul>
                            </aside>
                        </aside>

                        <aside className="lg:row-start-2 lg:row-end-3">
                            <div className="flex justify-between">
                                <h2 className="mb-2 text-xl font-semibold">
                                    Current status:
                                </h2>
                            </div>
                            <div>
                                <div className="grid grid-cols-4 pb-2 mt-12 mb-2 font-bold border-b-2 gap-x-6">
                                    <span>Service</span>
                                    <span>Type</span>
                                    <span>Status</span>
                                    <span>Latest check</span>
                                </div>
                                <ul className="flex flex-col gap-y-4">
                                    <li className="grid grid-cols-4 py-2 border-b gap-x-6 border-grey-400">
                                        <span>Mammut IO</span>
                                        <span>Products</span>
                                        <span className="rounded-full bg-[green] text-center text-white">
                                            Online
                                        </span>
                                        <span>20-04-2022 — 14:45</span>
                                    </li>
                                    <li className="grid grid-cols-4 py-2 border-b gap-x-6 border-grey-400">
                                        <span>Contentful</span>
                                        <span>Content</span>
                                        <span className="rounded-full bg-[red] text-center text-white">
                                            Error detected
                                        </span>
                                        <span>20-04-2022 — 14:45</span>
                                    </li>
                                    <li className="grid grid-cols-4 py-2 border-b gap-x-6 border-grey-400">
                                        <span>Mailchimp</span>
                                        <span>Subscription</span>
                                        <span className="rounded-full bg-[red] text-center text-white">
                                            Error detected
                                        </span>
                                        <span>20-04-2022 — 14:45</span>
                                    </li>
                                    <li className="grid grid-cols-4 py-2 border-b gap-x-6 border-grey-400">
                                        <span>Algolia</span>
                                        <span>Searching</span>
                                        <span className="rounded-full bg-[green] text-center text-white">
                                            Online
                                        </span>
                                        <span>20-04-2022 — 14:45</span>
                                    </li>
                                    <li className="grid grid-cols-4 py-2 border-b gap-x-6 border-grey-400">
                                        <span>Vercel</span>
                                        <span>Hosting</span>
                                        <span className="rounded-full bg-[green] text-center text-white">
                                            Online
                                        </span>
                                        <span>20-04-2022 — 14:45</span>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </main>
                </section>
            </Page>
        </>
    )
}

export async function getServerSideProps({ req, params }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)
    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('uid', user?.id)
        .single()

    const { data: notificationData, error: notificationError } = await supabase
        .from('notifications')
        .select()
        .match({ name: params.project })

    if (!user) {
        return {
            props: {},
            redirect: { destination: '/sign-in', permanent: false },
        }
    }

    const projectData = PROJECT_DATA.find(
        (item) => item.slug === params.project,
    )

    return {
        props: {
            user: {
                session: user,
                data: data,
            },
            projects: projectData,
            notifications: notificationData || undefined,
        },
    }
}

export default Project
