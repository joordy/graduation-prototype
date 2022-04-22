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
    errorMessage: `
        StatusCode 500 - Internal server Error`,
    specificCodeFile: '—',
    codeFunction: '',
    codeLine: '',
    priorityLevel: '',
}

const Project = ({ notificationData = [], projectData = {}, ...props }) => {
    const { connections = [], projectName } = projectData

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
                    <article className="xl:col-start-1 xl:col-end-2 xl:row-start-1 xl:row-end-7">
                        <h2 className="mb-2 text-xl font-semibold">
                            Current status:
                        </h2>
                        <ul>
                            {
                                // connections.length >= 1 ? (
                                connections.map(({ name, icon, status }, i) => {
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
                                })
                                // ) : (
                                //     <li>
                                //         <p>No connections on this platform</p>
                                //     </li>
                                // )
                            }
                        </ul>
                        {/*  {!connections.length >= 1 ? (
                            <p>No connections on this platform</p>
                        ) : (
                            <ul>
                                {projectData?.connections.map(
                                    ({ name, icon, status }, i) => {
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
                                                    <div
                                                        className={`h-[32px] w-[32px] rounded-lg bg-[#000000]`}
                                                    ></div>
                                                    /* <img
                                                        src={icon}
                                                        alt={`icon of ${name}`}
                                                        className="h-[32px] w-[32px]"
                                                    /> *
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
                                    },
                                )}
                            </ul>
                                )}*/}
                    </article>

                    <article className="xl:col-start-2 xl:col-end-3 xl:row-start-1 xl:row-end-3">
                        <h2 className="mb-2 text-xl font-semibold">
                            Recent Notifications:
                        </h2>
                        {!notificationData.length >= 1 ? (
                            <p>No current notifications..</p>
                        ) : (
                            <ul className="flex flex-col gap-y-4">
                                {notificationData.map((data, i) => {
                                    return (
                                        <NotificationElement
                                            key={i}
                                            hit={data}
                                        />
                                    )
                                })}
                            </ul>
                        )}
                    </article>

                    <article className="xl:row-start-4 xl:row-end-7">
                        <h2 className="mb-2 text-xl font-semibold">
                            Solved problems
                        </h2>

                        {projectName === 'Mammut' ? (
                            <ul>
                                <NotificationElement hit={TEST_DATA} />
                            </ul>
                        ) : (
                            <p>No solved notifications yet.</p>
                        )}
                    </article>
                </section>
            </Page>
        </>
    )
}

export const getStaticPaths = async () => {
    const paths = [
        { params: { slug: 'mammut' } },
        { params: { slug: 'aubade' } },
        { params: { slug: 'land-of-ride' } },
        { params: { slug: 'foam' } },
    ]

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params: { slug } }) {
    const data = PROJECT_DATA.find((item) => item.slug === slug)

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
