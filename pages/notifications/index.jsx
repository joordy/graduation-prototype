import { NOTIFICATION_DATA } from '_utils/siteData'
import Link from 'next/link'

const NotificationCenter = ({ notifications, ...props }) => {
    return (
        <main className="">
            <h1 className="text-3xl">Hallooo notificatie center?</h1>

            {notifications.map(({ slug, projectName }, i) => {
                return (
                    <li index={i}>
                        <Link href={`/notifications/${slug}`}>
                            <a>
                                {projectName} {slug}
                            </a>
                        </Link>
                    </li>
                )
            })}
        </main>
    )
}

export async function getStaticProps() {
    const data = NOTIFICATION_DATA

    console.log(data)

    return {
        props: { notifications: data },
    }
}

export default NotificationCenter
