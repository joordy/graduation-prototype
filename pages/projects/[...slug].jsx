import Breadcrumbs from '_components/blocks/Breadcrumbs'
import NotificationDetails from '_components/scopes/NotificationDetails'
import Page from '_components/scopes/global/Page'

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
    notificationNotFound = false,
    ...props
}) => {
    return (
        <Page topNav={true}>
            {notificationNotFound ? (
                <p>No notification can be found</p>
            ) : (
                <>
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
                </>
            )}
        </Page>
    )
}

export async function getServerSideProps({ params }) {
    const data = NOTIFICATION_DATA.find((item) => {
        return item.slug === params.slug[2]
    }) // Must always be like ['project', notification, 'notification id']

    if (!data) {
        return {
            props: { notificationNotFound: true },
        }
    }
    return {
        props: { notificationNotFound: false, ...data },
    }
}

export default Notification
