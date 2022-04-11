import Link from 'next/link'

import { supabase } from '_utils/database/init'
import { NOTIFICATION_DATA, PROJECT_DATA } from '_utils/siteData'

const Home = ({ userData, notificationData, ...props }) => {
    console.log('user dataaaaa', props)

    return (
        <div className="w-full h-full px-16 py-8">
            <h1 className="mb-8 text-3xl font-bold">Notifications:</h1>

            <ul className=" flex w-[50%] flex-col gap-y-4">
                {notificationData.map(
                    (
                        { projectName, projectIcon, shortDescription, slug },
                        i,
                    ) => {
                        return (
                            <li key={i} className="p-4 bg-white rounded-xl">
                                <Link href={`/notifications/${slug}`}>
                                    <a>
                                        <div className="flex">
                                            <div>
                                                <img
                                                    src={projectIcon}
                                                    alt={`icon of ${projectName}`}
                                                    className="h-[32px] w-[32px]"
                                                />{' '}
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-xl font-bold">
                                                    {projectName}
                                                </p>
                                                <p>{shortDescription}</p>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </li>
                        )
                    },
                )}
            </ul>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        return { props: {}, redirect: { destination: '/sign-in' } }
    }

    return {
        props: {
            userData: user,
            projectData: PROJECT_DATA,
            notificationData: NOTIFICATION_DATA,
        },
    }
}

export default Home
