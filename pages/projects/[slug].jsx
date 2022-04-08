import { PROJECT_DATA } from '_utils/siteData'

const Project = ({ projectName, ...props }) => {
    console.log(props)
    return (
        <main className="">
            <h1 className="text-3xl">{projectName}</h1>

            <a href="/sign-in">Sign in</a>
        </main>
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

    return {
        props: { ...data },
    }
}

export default Project
