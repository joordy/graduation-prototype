import Breadcrumbs from '_components/blocks/Breadcrumbs'
import NotificationDetails from '_components/scopes/NotificationDetails'
import Page from '_components/scopes/Page'

import { NOTIFICATION_DATA } from '_utils/database/dataset'

const STATUS = [
    {
        index: 6,
        state: 'Moved to BiA QA',
        date: '01-04-2022 — 10:22',
    },
    {
        index: 5,
        state: 'Moved to Mammut QA',
        date: '01-04-2022 — 10:22',
    },
    {
        index: 4,
        state: 'Moved to Ready for release',
        date: '01-04-2022 — 10:22',
    },
    {
        index: 3,
        state: 'Moved to Production',
        date: '01-04-2022 — 10:22',
    },
    {
        index: 2,
        state: 'Currently in Progress',
        date: '02-04-2022 — 9:32',
    },
    {
        index: 1,
        state: 'Reported on backlog',
        date: '01-04-2022 — 10:22',
    },
]

const Notification = ({
    projectName,
    intro,
    projectIcon,
    slug,
    specificCodeFile,
    errorMessage,
    ...props
}) => {
    return (
        <Page topNav={true}>
            <h1 className="mt-8 text-3xl font-bold">
                {projectName} ✗ {intro}
            </h1>

            <NotificationDetails
                STATUS={STATUS}
                projectName={projectName}
                intro={intro}
                projectIcon={projectIcon}
                slug={slug}
                specificCodeFile={specificCodeFile}
                errorMessage={errorMessage}
            />
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
