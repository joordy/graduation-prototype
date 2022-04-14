import Link from 'next/link'
import { motion } from 'framer-motion'

import { supabase } from '_utils/database/init'
import { NOTIFICATION_DATA, PROJECT_DATA } from '_utils/siteData'

import Page from '_components/scopes/Page'
import Notification from '_components/blocks/Notification'

const Home = ({ userData, notificationData, ...props }) => {
    return (
        <Page topNav={true}>
            <header>
                <h1 className="mb-8 text-3xl font-bold">Notifications:</h1>
            </header>

            <section className="grid gap-12 xl:grid-cols-2">
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
                                    shortDescription={shortDescription}
                                />
                            )
                        },
                    )}
                </ul>
            </section>
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
