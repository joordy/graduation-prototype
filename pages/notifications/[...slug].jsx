import Breadcrumbs from '_components/blocks/Breadcrumbs'
import Page from '_components/scopes/Page'

import { NOTIFICATION_DATA } from '_utils/database/dataset'

const STATUS = [
    {
        index: 7,
        state: 'Moved to BiA QA',
        date: '01-04-2022 — 10:22',
    },
    {
        index: 6,
        state: 'Moved to Mammut QA',
        date: '01-04-2022 — 10:22',
    },
    {
        index: 5,
        state: 'Moved to Ready for release',
        date: '01-04-2022 — 10:22',
    },
    {
        index: 4,
        state: 'Moved to Production',
        date: '01-04-2022 — 10:22',
    },
    {
        index: 3,
        state: 'Currently in Progress',
        date: '02-04-2022 — 9:32',
    },
    {
        index: 2,
        state: 'Currently in To-Do',
        date: '01-04-2022 — 10:32',
    },
    {
        index: 1,
        state: 'Reported on backlog',
        date: '01-04-2022 — 10:22',
    },

    {
        index: 1,
        state: 'Reported on backlog',
        date: '01-04-2022 — 10:22',
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
    console.log('props', props)

    return (
        <Page topNav={true}>
            <h1 className="mt-8 text-3xl font-bold">
                {projectName} ✗ {intro}
            </h1>

            <article className="mt-8 grid gap-12  overflow-hidden xl:h-[calc(100%-12rem)] xl:grid-cols-2 xl:grid-rows-6">
                <div className=" xl:row-start-1 xl:row-end-6">
                    <h2 className="mb-4 text-xl font-semibold">
                        Current status
                    </h2>
                    <ul className="flex flex-col  overflow-y-auto  xl:h-[calc(100%-45px)]">
                        {STATUS.map(({ state, date, index }, i) => {
                            return (
                                <li
                                    key={i}
                                    className="after:bg-pink-500 relative ml-12 inline-block rounded-lg p-4 before:absolute before:-left-6 before:top-[50%] before:block before:h-[12px] before:w-[12px] before:translate-y-[-50%] before:rounded-full before:bg-grey-900 after:absolute after:-left-6 after:z-[-1] after:block after:h-[40px] after:w-[4px]
                                    after:translate-x-[4px] after:bg-grey-900 first-of-type:m-0
                                    first-of-type:bg-grey-900 first-of-type:pl-16 
                                    first-of-type:text-white first-of-type:before:left-6 first-of-type:before:bg-grey-50 first-of-type:after:left-6 after:last-of-type:hidden
                                    "
                                >
                                    {!i == 0 ? (
                                        <p>abc</p>
                                    ) : (
                                        <p>abc weg er mee</p>
                                    )}
                                    <div className="flex justify-between">
                                        <p>{state}</p>
                                        <p>{date}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="xl:row-start-1 xl:row-end-7 xl:grid-cols-2">
                    <pre className="mb-8">Codefile: {specificCodeFile}</pre>

                    {errorMessage?.length >= 1 ? (
                        errorMessage.map((line, i) => {
                            return (
                                <pre className="text-xs" key={i}>
                                    {line}
                                </pre>
                            )
                        })
                    ) : (
                        <pre className="text-xs">no error message</pre>
                    )}
                </div>
                <div className="xl:row-start-6 xl:row-end-7 xl:grid-cols-1">
                    <a
                        href="#"
                        className="block p-2 my-2 text-center bg-white border-2 rounded-md border-grey-900 text-grey-900"
                    >
                        Ticket to Jira / GitLab board
                    </a>
                </div>
            </article>
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
