import Link from 'next/link'
import Head from 'next/head'

import { NOTIFICATION_DATA, PROJECT_DATA } from '_utils/siteData'

import Page from '_components/scopes/Page'
import Notification from '_components/blocks/Notification'

const Project = ({ notificationData = [], projectData = {}, ...props }) => {
    const { connections } = projectData
    console.log(connections)
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

                <section className="grid grid-cols-2 gap-3">
                    <article>
                        <h2 className="mb-2 text-xl font-semibold">
                            Current status:
                        </h2>

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

                    <article>
                        <h2 className="mb-2 text-xl font-semibold">
                            Recent Notifications:
                        </h2>
                        {!notificationData.length >= 1 ? (
                            <p>No current notifications..</p>
                        ) : (
                            <ul className="flex flex-col gap-y-4">
                                {notificationData.map(
                                    (
                                        {
                                            projectName,
                                            projectIcon,
                                            shortDescription,
                                            slug,
                                        },
                                        i,
                                    ) => {
                                        return (
                                            <Notification
                                                slug={slug}
                                                projectName={projectName}
                                                projectIcon={projectIcon}
                                                shortDescription={
                                                    shortDescription
                                                }
                                            />
                                        )
                                    },
                                )}
                            </ul>
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
