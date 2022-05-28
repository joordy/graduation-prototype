import { useEffect } from 'react'
import Head from 'next/head'

import { supabase } from '_utils/database/init'
import { useSetUserData } from '_utils/atoms/userData'

import Page from '_components/scopes/global/Page'
import Board from '_components/scopes/project/Board'
import StatusCheck from '_components/scopes/project/StatusCheck'

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
                    <header>
                        <h1 className="text-3xl font-bold ">{projectName}</h1>
                    </header>

                    <main className="h-[inherit] desktop:grid desktop:grid-cols-1 desktop:grid-rows-2 desktop:gap-x-4">
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
