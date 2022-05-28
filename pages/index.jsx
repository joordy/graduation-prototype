import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

import { useAuth } from '_utils/context/auth'
import { supabase } from '_utils/database/init'
import { useSetUserData, useUserData } from '_utils/atoms/userData'

import Card from '_components/blocks/Card'
import Page from '_components/scopes/global/Page'
import Notification from '_components/common/notifications/Notification'
import IssueBlock from '_components/common/IssueBlock'

const Home = ({ notifications, projects, user, ...props }) => {
    const abc = useAuth()
    const userData = useUserData()
    const setUserData = useSetUserData()

    const projectData = useMemo(() => {
        return projects.filter((projects) => {
            return userData?.projects?.indexOf(projects.projectName) > -1
        })
    }, [projects, userData])

    useEffect(() => {
        setUserData(user?.data)
    }, [user?.data])

    return (
        <Page>
            <section className="h-[calc(100%-3em)]">
                <header>
                    <h1 className="text-3xl font-bold ">
                        Hi {user?.data?.firstName}!
                    </h1>
                </header>

                <main className="h-[inherit] desktop:grid desktop:grid-cols-2 desktop:grid-rows-[200px_auto] desktop:gap-x-4">
                    <ProjectSelection
                        projectData={projectData}
                        notifications={notifications}
                    />

                    <NotificationList notifications={notifications} />

                    <Statistics />
                </main>
            </section>
        </Page>
    )
}

const ProjectSelection = ({ projectData, notifications }) => {
    const elementsCount = (data, selected) => {
        return data.filter((item) => {
            return item.name === selected
        }).length
    }

    return (
        <section className="py-4 desktop:col-start-1 desktop:col-end-3">
            <h2 className="mb-4 text-xl font-medium">Your projects</h2>
            <ul className="flex justify-between gap-4">
                {projectData.map((project, i) => {
                    return (
                        <Card
                            tag="li"
                            key={i}
                            className="bg-grey-50 w-full rounded-xl p-4 shadow-md duration-75 ease-in hover:bg-[rgb(228,228,228)]"
                        >
                            <Link
                                href={`/projects/${project?.slug?.toLocaleLowerCase()}`}
                            >
                                <a className="flex flex-col justify-between ">
                                    <h3 className="font-bold text-md ">
                                        {project.projectName}
                                    </h3>

                                    <div className="flex items-center justify-between pt-8">
                                        <p className="text-xs ">
                                            Current notifications:
                                        </p>
                                        <span className="text-xs">
                                            {elementsCount(
                                                notifications,
                                                project.slug.toLocaleLowerCase(),
                                            )}
                                        </span>
                                    </div>
                                </a>
                            </Link>
                        </Card>
                    )
                })}
            </ul>
        </section>
    )
}

const Statistics = ({}) => {
    return (
        <section className="flex flex-col gap-4">
            <div>
                <h2 className="text-xl font-medium">Statistics</h2>
            </div>
            <div className="flex flex-col items-center justify-center h-full rounded-lg bg-grey-50">
                <p>Coming soon.</p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            </div>
        </section>
    )
}

const NotificationList = ({ notifications }) => {
    const [openTab, setOpenTab] = useState(1)

    return (
        <section className="flex flex-col gap-4">
            <div>
                <h2 className="text-xl font-medium">Notifications</h2>
            </div>
            <div>
                <ul className="flex gap-4 mb-2">
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
                                    (openTab === 1 ? ' font-bold' : '')
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
                                    (openTab === 2 ? ' font-bold' : '')
                                }
                            >
                                In progress
                            </h3>
                        </button>
                    </li>
                </ul>

                {/* <ul className="flex flex-col gap-y-4">
                    {notifications.map((data, i) => {
                        return <Notification data={data} key={i} />
                    })}
                </ul> */}
                <div className={openTab === 1 ? 'block' : 'hidden'} id="link2">
                    <IssueBlock
                        showTitle={false}
                        issueTitle="Recent"
                        issueStatus="Reported"
                        emptyText="No notifications reported."
                        notifications={notifications}
                    />
                </div>
                <div className={openTab === 2 ? 'block' : 'hidden'} id="link3">
                    <IssueBlock
                        showTitle={false}
                        issueTitle="In Progress"
                        issueStatus="In progress"
                        emptyText="No notifications in progress yet."
                        notifications={notifications}
                    />
                </div>
            </div>
        </section>
    )
}

export async function getServerSideProps({ req, res }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)
    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('uid', user?.id)
        .single()

    // const { data: injectedData, error: injectedError } = await supabase
    //     .from('projects')
    //     .insert(PROJECT_DATA)

    const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select()

    const { data: notificationData, error: notificationError } = await supabase
        .from('notifications')
        .select()

    if (!user) {
        return {
            props: {},
            redirect: { destination: '/sign-in', permanent: false },
        }
    }

    return {
        props: {
            user: {
                session: user,
                data: data,
            },
            projects: projectData || [],
            notifications: notificationData || [],
        },
    }
}

export default Home
