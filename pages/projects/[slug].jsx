import Link from 'next/link'
import Head from 'next/head'

import { NOTIFICATION_DATA, PROJECT_DATA } from '_utils/siteData'

const Project = ({ notificationData = [], projectData, ...props }) => {
    console.log('🚀 ~ file: [slug].jsx ~ line 6 ~ Project ~ props', props)
    return (
        <>
            <Head>
                <title>{projectData.projectName} — Uptime Tracker</title>
            </Head>

            <section className="">
                <header>
                    <h1 className="mb-8 text-3xl font-bold">
                        {projectData.projectName}
                    </h1>
                </header>
                <main>
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
                                    <li
                                        key={i}
                                        className="p-4 bg-white rounded-xl"
                                    >
                                        <Link href={`/notifications/${slug}`}>
                                            <a>
                                                <div className="flex">
                                                    <div>
                                                        <img
                                                            src={projectIcon}
                                                            alt={`icon of ${projectName}`}
                                                            className="h-[32px] w-[32px]"
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <p className="text-xl font-bold">
                                                            {projectName}
                                                        </p>
                                                        <p>
                                                            {shortDescription}
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </li>
                                )
                            },
                        )}
                    </ul>
                </main>
            </section>
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
    const notifications = NOTIFICATION_DATA.find(
        (item) => item?.projectName === data?.projectName,
    )

    return {
        props: { projectData: data, notificationData: [notifications] },
    }
}

export default Project
