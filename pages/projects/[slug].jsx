import Head from 'next/head'

import { PROJECT_DATA } from '_utils/siteData'

const Project = ({ projectName, ...props }) => {
    console.log(props)
    return (
        <>
            <Head>
                <title>{projectName} — Uptime Tracker</title>
            </Head>
            <h1 className="text-3xl">{projectName}</h1>
        </>
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
