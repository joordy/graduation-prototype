import { useEffect, useMemo } from 'react'

import { useAuth } from '_utils/context/auth'
import { supabase } from '_utils/database/init'
import { useSetUserData, useUserData } from '_utils/atoms/userData'

import Page from '_components/scopes/global/Page'
import Overview from '_components/scopes/overview/Overview'

const Home = ({ notifications, projects, user, data, ...props }) => {
    const abc = useAuth()
    console.log(abc)
    const userData = useUserData()
    const setUserData = useSetUserData()

    const projectData = useMemo(() => {
        return projects.filter((projects) => {
            return userData?.projects?.indexOf(projects.projectName) > -1
        })
    }, [projects, userData])

    useEffect(() => {
        setUserData(data)
    }, [data])

    return (
        <Page>
            <section className="h-[calc(100%-3em)]">
                <header>
                    <h1 className="text-3xl font-bold ">
                        Hi {user?.user_metadata?.firstName}!
                    </h1>
                </header>

                <main className="flex flex-col gap-4 pb-28 desktop:grid desktop:h-[inherit] desktop:grid-cols-2 desktop:grid-rows-[200px_auto]">
                    <Overview
                        notifications={notifications}
                        projectData={projectData}
                    />
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

    console.log('user,', user)

    return {
        props: {
            user: user,
            data: data,
            projects: projectData || [],
            notifications: notificationData || [],
        },
    }
}

export default Home
