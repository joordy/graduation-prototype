import { NOTIFICATION_DATA } from '_utils/siteData'
import Link from 'next/link'

const NotificationCenter = ({ notifications, ...props }) => {
    return (
        <>
            <h1 className="mb-8 text-3xl font-bold">
                Hallooo notificatie center?
            </h1>

            {notifications &&
                notifications.map(({ slug, projectName }, i) => {
                    return (
                        <li key={i}>
                            <Link href={`/notifications/${slug}`}>
                                <a>
                                    {projectName} {slug}
                                </a>
                            </Link>
                        </li>
                    )
                })}
        </>
    )
}

export async function getStaticProps() {
    const data = NOTIFICATION_DATA

    return {
        props: { notifications: data },
    }
}

export default NotificationCenter
