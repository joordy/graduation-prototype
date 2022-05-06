import { useEffect, useMemo } from 'react'
import Link from 'next/link'

import { useAuth } from '_utils/context/auth'
import { supabase } from '_utils/database/init'
import { NOTIFICATION_DATA, PROJECT_DATA } from '_utils/database/dataset'
import { useSetUserData, useUserData } from '_utils/atoms/userData'

import Page from '_components/scopes/Page'
import NotificationElement from '_components/blocks/NotificationElement'

const Home = ({ notifications, projects, user, ...props }) => {
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
                                        className="w-full h-48 p-4 rounded-md bg-grey-50"
                                    >
                                        <h3 className="text-2xl font-bold">
                                            {project.projectName}
                                        </h3>
                                    </li>
                                )
                            })}
                        </ul>
                    </article>

                    <article className="xl:grid xl:grid-cols-2 xl:gap-4">
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
                                            <NotificationElement
                                                key={i}
                                                hit={data}
                                            />
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
                                <p>hi</p>
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
