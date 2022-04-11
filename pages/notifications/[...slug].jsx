import { NOTIFICATION_DATA } from '_utils/siteData'

const Notification = ({ slug, ...props }) => {
    console.log(props)
    return (
        <>
            <h1 className="text-3xl">notificatie van {slug}</h1>
        </>
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
