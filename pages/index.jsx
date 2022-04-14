import Link from 'next/link'
import { motion } from 'framer-motion'

import { supabase } from '_utils/database/init'
import { NOTIFICATION_DATA, PROJECT_DATA } from '_utils/siteData'

import Page from '_components/scopes/Page'

const Home = ({ userData, notificationData, ...props }) => {
    return (
        <Page topNav={true}>
            <>
                <header>
                    <h1 className="mb-8 text-3xl font-bold">Notifications:</h1>
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
                                        className="rounded-xl bg-white p-4"
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
            </>
        </Page>
    )
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        return { props: {}, redirect: { destination: '/sign-in' } }
    }

    return {
        props: {
            userData: user,
            projectData: PROJECT_DATA,
            notificationData: NOTIFICATION_DATA,
        },
    }
}

export default Home
