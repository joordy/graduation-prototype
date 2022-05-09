import { useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import { useAuth } from '_utils/context/auth'
import { supabase } from '_utils/database/init'
import { NOTIFICATION_DATA, PROJECT_DATA } from '_utils/database/dataset'
import { useSetUserData, useUserData } from '_utils/atoms/userData'

import Page from '_components/scopes/Page'
import NotificationElement from '_components/blocks/NotificationElement'

const TEST_DATA = {
    projectName: 'Mammut',
    projectIcon: '/icons/mammut.ico',
    name: 'mammut',
    slug: '01_04_2022_0002',
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

    return (
        <>
            <Head>
                <title>{projectName} — Uptime Tracker</title>
            </Head>

            <Page topNav={true}>
                <header>
                    <h1 className="mb-8 text-3xl font-bold">{projectName}</h1>
                </header>

                <section className="grid gap-3  xl:h-[calc(100%-12rem)] xl:grid-cols-3 xl:grid-rows-6">
                    <article className="xl:row-start-1 xl:row-end-4">
                        <h2 className="mb-2 text-xl font-semibold">Issues:</h2>
                        {!notifications.length >= 1 ? (
                            <p>No current notifications..</p>
                        ) : (
                            <ul className="flex flex-col gap-y-4">
                                {notifications.map((data, i) => {
                                    return (
                                        <li
                                            className="px-4 py-2 shadow-md rounded-xl bg-grey-50"
                                            key={i}
                                        >
                                            <Link
                                                href={`/projects/${projectName.toLocaleLowerCase()}/notifications/${
                                                    data.slug
                                                }`}
                                            >
                                                <a>
                                                    <div className="grid grid-cols-[32px_auto] gap-4">
                                                        <div className="flex items-center justify-center">
                                                            <img
                                                                src={
                                                                    data.projectIcon
                                                                }
                                                                alt={`icon of ${data.projectName}`}
                                                                className="h-[32px] w-[32px]"
                                                            />
                                                        </div>
                                                        <div className="col-start-2 grid grid-cols-[auto_60px] grid-rows-[auto_20px] gap-2 ">
                                                            <IssueTitle
                                                                title={
                                                                    data.intro
                                                                }
                                                            />

                                                            <PriorityElement priority="High" />
                                                            <CalculatedTimeAgo date="Thu May 05 2022 13:01:39 GMT+0200 (CEST)" />

                                                            <p className="row-start-2 text-right">
                                                                —
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </article>

                    <article className="xl:col-start-2 xl:row-start-1 xl:row-end-4">
                        <h2 className="mb-2 text-xl font-semibold">
                            In progress
                        </h2>

                        {projectName === 'Mammut' ? (
                            <ul>
                                <li className="px-4 py-2 shadow-md rounded-xl bg-grey-50">
                                    <div className="relative flex items-center">
                                        <div className="flex items-center justify-center">
                                            <img
                                                src={TEST_DATA.projectIcon}
                                                alt={`icon of ${TEST_DATA.projectName}`}
                                                className="h-[24px] w-[24px]"
                                            />
                                        </div>
                                        <div className="flex items-center justify-center ml-4">
                                            <p>{TEST_DATA.intro}</p>
                                        </div>
                                        <p className="absolute top-[50%] right-0 -translate-y-[50%] text-xs text-grey-300">
                                            {TEST_DATA.status}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        ) : (
                            <p>No solved notifications yet.</p>
                        )}
                    </article>

                    <article className="xl:col-start-3 xl:row-start-1 xl:row-end-4">
                        <h2 className="mb-2 text-xl font-semibold">
                            Solved issues
                        </h2>

                        {projectName === 'Mammut' ? (
                            <ul>
                                <li className="px-4 py-2 shadow-md rounded-xl bg-grey-50">
                                    <div className="relative flex items-center">
                                        <div className="flex items-center justify-center">
                                            <img
                                                src={TEST_DATA.projectIcon}
                                                alt={`icon of ${TEST_DATA.projectName}`}
                                                className="h-[24px] w-[24px]"
                                            />
                                        </div>
                                        <div className="flex items-center justify-center ml-4">
                                            <p>{TEST_DATA.intro}</p>
                                        </div>
                                        <p className="absolute top-[50%] right-0 -translate-y-[50%] text-xs text-grey-300">
                                            {TEST_DATA.status}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        ) : (
                            <p>No solved notifications yet.</p>
                        )}
                    </article>

                    <article className="xl:col-start-1 xl:col-end-4 xl:row-start-4 xl:row-end-7">
                        <div className="flex justify-between">
                            <h2 className="mb-2 text-xl font-semibold">
                                Current status:
                            </h2>
                            <span className="px-10 py-2 rounded-lg bg-grey-500">
                                Filters
                            </span>
                        </div>
                        <div>
                            <div className="grid grid-cols-4 mt-12 mb-6 font-bold gap-x-6 ">
                                <span>Service</span>
                                <span>Type</span>
                                <span>Status</span>
                                <span>Latest check</span>
                            </div>
                            <ul className="flex flex-col gap-y-4">
                                <li className="grid grid-cols-4 gap-x-6 ">
                                    <span>Mammut IO</span>
                                    <span>API</span>
                                    <span className="rounded-full bg-[green] text-center text-white">
                                        Online
                                    </span>
                                    <span>20-04-2022 — 14:45</span>
                                </li>
                                <li className="grid grid-cols-4 gap-x-6">
                                    <span>Contentful</span>
                                    <span>API</span>
                                    <span className="rounded-full bg-[red] text-center text-white">
                                        Error detected
                                    </span>
                                    <span>20-04-2022 — 14:45</span>
                                </li>
                                <li className="grid grid-cols-4 gap-x-6">
                                    <span>Mailchimp</span>
                                    <span>API</span>
                                    <span className="rounded-full bg-[red] text-center text-white">
                                        Error detected
                                    </span>
                                    <span>20-04-2022 — 14:45</span>
                                </li>
                                <li className="grid grid-cols-4 gap-x-6">
                                    <span>Algolia</span>
                                    <span>API</span>
                                    <span className="rounded-full bg-[green] text-center text-white">
                                        Online
                                    </span>
                                    <span>20-04-2022 — 14:45</span>
                                </li>
                                <li className="grid grid-cols-4 gap-x-6">
                                    <span>Vercel</span>
                                    <span>Hosting</span>
                                    <span className="rounded-full bg-[green] text-center text-white">
                                        Online
                                    </span>
                                    <span>20-04-2022 — 14:45</span>
                                </li>
                            </ul>
                            {/* <FlowStatus name={projectName} data={connections} /> */}
                        </div>
                    </article>
                </section>
            </Page>
        </>
    )
}

const IssueTitle = ({ title }) => {
    return (
        <p className="h-6 col-start-1 row-start-1 overflow-hidden font-bold">
            {title}
        </p>
    )
}

const CalculatedTimeAgo = ({ date }) => {
    useEffect(() => {
        // in miliseconds
        var units = {
            year: 24 * 60 * 60 * 1000 * 365,
            month: (24 * 60 * 60 * 1000 * 365) / 12,
            day: 24 * 60 * 60 * 1000,
            hour: 60 * 60 * 1000,
            minute: 60 * 1000,
            second: 1000,
        }

        var rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

        var getRelativeTime = (d1, d2 = new Date()) => {
            var elapsed = d1 - d2

            // "Math.abs" accounts for both "past" & "future" scenarios
            for (var u in units)
                if (Math.abs(elapsed) > units[u] || u == 'second')
                    return rtf.format(Math.round(elapsed / units[u]), u)
        }

        // test-list of dates to compare with current date

        const dataTimes = [
            '10/20/1984',
            '10/20/2015',
            +new Date() - units.year,
            +new Date() - units.month,
            +new Date() - units.day,
            +new Date() - units.hour,
            +new Date() - units.minute,
            +new Date() + units.minute * 2,
            +new Date() + units.day * 7,
            // date,
        ]

        // dataTimes.forEach((d) =>
        //     // console.log(
        //     //     new Date(d).toLocaleDateString(),
        //     //     new Date(d).toLocaleTimeString(),
        //     //     '(Relative to now) →',
        //     //     getRelativeTime(+new Date(d)),
        //     // ),
        // )
    }, [])

    return (
        <p className="row-start-1 text-xs text-right text-grey-500 ">1h ago</p>
    )
}

const PriorityElement = ({ priority = 'urgent' }) => {
    return (
        <span className="col-start-1 row-start-2 flex h-[20px] w-fit flex-col items-center justify-center rounded-md bg-red px-2 text-xs text-white">
            {priority}
        </span>
    )
}

// export const getStaticPaths = async () => {
//     const paths = [
//         { params: { project: 'mammut' } },
//         { params: { project: 'aubade' } },
//         { params: { project: 'land-of-ride' } },
//         { params: { project: 'foam' } },
//     ]

//     return {
//         paths,
//         fallback: true,
//     }
// }

export async function getServerSideProps({ req, params }) {
    console.log(params)

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

    const projectData = PROJECT_DATA.find(
        (item) => item.slug === params.project,
    )

    const notifications = NOTIFICATION_DATA.filter((item) => {
        return item?.projectName === projectData?.projectName
    })

    return {
        props: {
            user: {
                session: user,
                data: data,
            },
            projects: projectData,
            notifications: notifications || undefined,
        },
    }
}

export default Project
