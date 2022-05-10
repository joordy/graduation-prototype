import { useEffect, useMemo } from 'react'
import Link from 'next/link'

import { useAuth } from '_utils/context/auth'
import { supabase } from '_utils/database/init'
import { NOTIFICATION_DATA, PROJECT_DATA } from '_utils/database/dataset'
import { useSetUserData, useUserData } from '_utils/atoms/userData'

import Page from '_components/scopes/Page'
import NotificationElement from '_components/blocks/NotificationElement'

const Home = ({ notifications, projects, user, ...props }) => {
    console.log('userrr', user)
    const userData = useUserData()
    const setUserData = useSetUserData()

    const projectData = useMemo(() => {
        return projects.filter((projects) => {
            return userData?.projects?.indexOf(projects.projectName) > -1
        })
    }, [PROJECT_DATA, userData])

    useEffect(() => {
        setUserData(user?.data)
    }, [user?.data])

    return (
        <Page topNav={true}>
            <section>
                <header>
                    <h1 className="mb-8 text-3xl font-bold">
                        Hello {user?.data?.firstName}
                    </h1>
                </header>

                <main>
                    <article className="mb-8">
                        <h2 className="mb-4 text-xl font-medium">
                            Your projects
                        </h2>
                        <ul className="flex justify-between gap-4">
                            {projectData.map((project, i) => {
                                return (
                                    <li
                                        key={i}
                                        className="flex flex-col justify-between w-full h-32 p-4 rounded-md shadow-md bg-grey-50"
                                    >
                                        <h3 className="font-bold text-md ">
                                            {project.projectName}
                                        </h3>

                                        <p className="text-xs">
                                            Current notifications: 1
                                        </p>
                                    </li>
                                )
                            })}
                        </ul>
                    </article>

                    <article className="flex flex-col gap-4 xl:grid xl:grid-cols-2">
                        <section>
                            <header>
                                <h2 className="mb-4 text-xl font-medium">
                                    Recent notifications
                                </h2>
                            </header>
                            <main>
                                <ul className="flex flex-col gap-y-4">
                                    {notifications.map((data, i) => {
                                        return (
                                            <li
                                                key={i}
                                                className="px-4 py-2 shadow-md rounded-xl bg-grey-50"
                                            >
                                                <div className="relative flex">
                                                    <div className="flex items-center justify-center">
                                                        <img
                                                            src={
                                                                data.projectIcon
                                                            }
                                                            alt={`icon of ${data.projectName}`}
                                                            className="h-[24px] w-[24px]"
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-center ml-4">
                                                        <p>{data.intro}</p>
                                                    </div>
                                                    <p className="absolute top-0 right-0 text-xs text-grey-300">
                                                        {data.status}
                                                    </p>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </main>
                        </section>
                        <section>
                            <header>
                                <h2 className="mb-4 text-xl font-medium">
                                    Statistics
                                </h2>
                            </header>
                            <main>
                                <p>Statistics coming soon here.</p>
                            </main>
                        </section>
                    </article>
                </main>
            </section>
        </Page>
    )
}

export async function getServerSideProps({ req, res }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)
    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('uid', user?.id)
        .single()

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
            projects: PROJECT_DATA,
            notifications: NOTIFICATION_DATA,
        },
    }
}

export default Home
