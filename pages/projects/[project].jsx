import { useEffect } from 'react'
import Head from 'next/head'

import { supabase } from '_utils/database/init'
import { useSetUserData } from '_utils/atoms/userData'

import Page from '_components/scopes/global/Page'
import Board from '_components/scopes/project/Board'
import StatusCheck from '_components/scopes/project/StatusCheck'

const Project = ({ notifications = [], project = {}, user, ...props }) => {
    const setUserData = useSetUserData()
    const { projectName } = project

    useEffect(() => {
        setUserData(user?.data)
    }, [user?.data])

    return (
        <>
            <Head>
                <title>{projectName} — Quickly</title>
            </Head>

            <Page topNav={true}>
                <section className="h-[calc(100%-3em)]">
                    <header className="mb-4">
                        <h1 className="text-3xl font-bold ">{projectName}</h1>
                    </header>

                    <main className="flex flex-col gap-4 pb-28 desktop:grid desktop:max-h-[calc(100%-5em)] desktop:grid-cols-1 desktop:grid-rows-[minmax(100px,_350px)_minmax(75px,_1fr)] desktop:gap-12 desktop:p-0">
                        <Board notifications={notifications} />

                        <StatusCheck
                            project={project}
                            notifications={notifications}
                        />
                    </main>
                </section>
            </Page>
        </>
    )
}

export async function getServerSideProps({ req, params }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    const { data: userData, error: userError } = await supabase
        .from('users')
        .select()
        .eq('uid', user?.id)
        .single()

    const { data: notificationData, error: notificationError } = await supabase
        .from('notifications')
        .select()
        .match({ name: params.project })

    const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select()
        .match({ slug: params.project })
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
                data: userData,
            },
            project: projectData || undefined,
            notifications: notificationData || undefined,
        },
    }
}

export default Project
