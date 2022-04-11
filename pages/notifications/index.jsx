import { NOTIFICATION_DATA } from '_utils/siteData'
import Link from 'next/link'

const NotificationCenter = ({ notifications, ...props }) => {
    return (
        <>
            <h1 className="text-3xl">Hallooo notificatie center?</h1>

            {notifications.map(({ slug, projectName }, i) => {
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
    console.log('🚀 ~ file: index.jsx ~ line 26 ~ getStaticProps ~ data', data)

    return {
        props: { notifications: data },
    }
}

export default NotificationCenter
