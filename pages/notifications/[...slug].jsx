import Page from '_components/scopes/Page'

import { NOTIFICATION_DATA } from '_utils/siteData'

const Notification = ({ slug, ...props }) => {
    return (
        <Page topNav={true}>
            <h1 className="mb-8 text-3xl font-bold">notificatie van {slug}</h1>
        </Page>
    )
}

export const getStaticPaths = async () => {
    const paths = [
        { params: { slug: ['12-345'] } },
        { params: { slug: ['23-456'] } },
        { params: { slug: ['34-567'] } },
        { params: { slug: ['45-678'] } },
    ]

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params: { slug } }) {
    const data = NOTIFICATION_DATA.find((item) => item.slug === slug[0])

    return {
        props: { ...data },
    }
}

export default Notification
