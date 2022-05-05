import Link from 'next/link'

import { useAuth } from '_utils/context/auth'
import { supabase } from '_utils/database/init'
import { NOTIFICATION_DATA, PROJECT_DATA } from '_utils/database/dataset'

import Page from '_components/scopes/Page'
import NotificationElement from '_components/blocks/NotificationElement'

const Home = ({ notificationData, projectData, user, ...props }) => {
    return (
        <Page topNav={true}>
            {user && (
                <>
                    <h2>Welcome!</h2>
                    <code className="highlight">{user.role}</code>
                    <Link href="/profile">
                        <a className="button">Go to Profile</a>
                    </Link>
                    <button type="button" className="button" onClick={signOut}>
                        Sign Out
                    </button>
                </>
            )}

            <header>
                <h1 className="mb-8 text-3xl font-bold">Notifications:</h1>
            </header>

            <section className="grid gap-12 xl:grid-cols-2">
                <ul className="flex flex-col gap-y-4">
                    {notificationData.map((data, i) => {
                        return <NotificationElement key={i} hit={data} />
                    })}
                </ul>
            </section>
        </Page>
    )
}

export async function getServerSideProps({ req, res }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    console.log('user home', user)
    if (!user) {
        console.log('Please login.')
        return {
            props: {},
            redirect: { destination: '/sign-in', permanent: false },
        }
    }

    return {
        props: {
            user,
            projectData: PROJECT_DATA,
            notificationData: NOTIFICATION_DATA,
        },
    }
}

export default Home
