import Link from 'next/link'
import { motion } from 'framer-motion'

import { NOTIFICATION_DATA } from '_utils/database/dataset'

import Page from '_components/scopes/Page'
import Notification from '_components/blocks/Notification'

const NotificationCenter = ({ notifications, ...props }) => {
    return (
        <Page topNav={true}>
            <h1 className="mb-8 text-3xl font-bold">New notifications</h1>

            <section className="grid grid-cols-2 gap-3">
                <ul className="flex flex-col gap-y-4">
                    {notifications &&
                        notifications.map(
                            (
                                {
                                    slug,
                                    projectName,
                                    projectIcon,
                                    shortDescription,
                                },
                                i,
                            ) => {
                                return (
                                    <Notification
                                        key={i}
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

export async function getStaticProps() {
    const data = NOTIFICATION_DATA

    return {
        props: { notifications: data },
    }
}

export default NotificationCenter
