import Link from 'next/link'
import { motion } from 'framer-motion'

import { NOTIFICATION_DATA } from '_utils/database/dataset'

import Page from '_components/scopes/Page'
import NotificationElement from '_components/blocks/NotificationElement'

const NotificationCenter = ({ notifications, ...props }) => {
    return (
        <Page topNav={true}>
            <section className="h-[calc(100%-12rem)] ">
                <header>
                    <h1 className="mb-8 text-3xl font-bold">
                        Notification center
                    </h1>
                </header>
                <main className="grid h-full grid-cols-2 gap-3">
                    <section>
                        <h2 className="mb-2 text-xl font-semibold">
                            Open notifications
                        </h2>
                        <ul className="flex flex-col gap-y-4">
                            {notifications &&
                                notifications.map((data, i) => {
                                    return (
                                        <NotificationElement
                                            key={i}
                                            hit={data}
                                        />
                                    )
                                })}
                        </ul>
                    </section>
                    <section className="h-full">
                        <article className="flex flex-col items-center justify-center h-full mt-8 border">
                            <p>Nothing selected yet...</p>
                        </article>
                    </section>
                </main>
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
