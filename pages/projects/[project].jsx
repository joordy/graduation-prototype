import Link from 'next/link'
import Head from 'next/head'

import { NOTIFICATION_DATA, PROJECT_DATA } from '_utils/database/dataset'

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

const Project = ({ notificationData = [], projectData = {}, ...props }) => {
    const { connections = [], projectName } = projectData

    console.log(notificationData)
    console.log(`projects/${projectName.toLowerCase()}/notification/test`)
    return (
        <>
            <Head>
                <title>{projectData.projectName} — Uptime Tracker</title>
            </Head>

            <Page topNav={true}>
                <header>
                    <h1 className="mb-8 text-3xl font-bold">
                        {projectData.projectName}
                    </h1>
                </header>

                <section className="grid gap-3 overflow-hidden xl:h-[calc(100%-12rem)] xl:grid-cols-2 xl:grid-rows-6">
                    <article className="xl:row-start-1 xl:row-end-4">
                        <h2 className="mb-2 text-xl font-semibold">Issues:</h2>
                        {!notificationData.length >= 1 ? (
                            <p>No current notifications..</p>
                        ) : (
                            <ul className="flex flex-col gap-y-4">
                                {notificationData.map((data, i) => {
                                    return (
                                        <NotificationElement
                                            projectSlug={`/projects/${projectData.projectName}/`}
                                            key={i}
                                            hit={data}
                                        />
                                    )
                                })}
                            </ul>
                        )}
                    </article>

                    <article className="xl:col-start-2 xl:row-start-1 xl:row-end-4">
                        <h2 className="mb-2 text-xl font-semibold">
                            Solved issues
                        </h2>

                        {projectName === 'Mammut' ? (
                            <ul>
                                <NotificationElement hit={TEST_DATA} />
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
                        {/* <ul>
                            {connections.map(({ name, icon, status }, i) => {
                                return (
                                    <li
                                        key={i}
                                        className={`mb-3 flex rounded-xl border-2 border-green bg-white p-4 ${
                                            status
                                                ? 'border-green'
                                                : 'border-red'
                                        }`}
                                    >
                                        <div>
                                            <img
                                                src={icon}
                                                alt={`icon of ${name}`}
                                                className="h-[32px] w-[32px]"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between w-full ml-4">
                                            <p>{name}</p>
                                            <span
                                                className={`h-[20px] w-[20px] ${
                                                    status
                                                        ? 'bg-green'
                                                        : 'bg-red'
                                                }`}
                                            ></span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul> */}
                    </article>
                </section>
            </Page>
        </>
    )
}

export const getStaticPaths = async () => {
    const paths = [
        { params: { project: 'mammut' } },
        { params: { project: 'aubade' } },
        { params: { project: 'land-of-ride' } },
        { params: { project: 'foam' } },
    ]

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params: { project } }) {
    const data = PROJECT_DATA.find((item) => item.slug === project)

    const notifications = NOTIFICATION_DATA.filter((item) => {
        return item?.projectName === data?.projectName
    })

    return {
        props: {
            projectData: data,
            notificationData: notifications || undefined,
        },
    }
}

export default Project
