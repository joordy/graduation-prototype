import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Page from '_components/scopes/Page'
import { useAuth } from '_utils/context/auth'

import { supabase } from '_utils/database/init'

const Profile = ({ user }) => {
    const router = useRouter()
    const data = useAuth()

    const onHandleSignOut = async (e) => {
        const { error: err } = await supabase.auth.signOut()

        if (err) console.error(err)
        router.push('/sign-in')
    }

    return (
        <Page topNav={true}>
            <section className="flex flex-col ">
                <header>
                    <h1 className="mb-8 text-3xl font-bold">User Profile</h1>
                    <nav class>
                        <ul className="flex gap-2 m-0">
                            <li className="">User info</li>
                            <li>Settings</li>
                        </ul>
                    </nav>
                </header>

                <main className="flex flex-col mt-4">
                    <code className="highlight">{user.email}</code>
                    <div className="heading">Last Signed In:</div>
                    <code className="highlight">
                        {new Date(user.last_sign_in_at).toLocaleString()}
                    </code>
                    <button onClick={onHandleSignOut}>Sign out</button>
                    <Link href="/">
                        <a className="button">Go Home</a>
                    </Link>
                </main>
            </section>
        </Page>
    )
}

export async function getServerSideProps({ req, res }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        return { props: {}, redirect: { destination: '/', permanent: false } }
    }

    return { props: { user } }
}

export default Profile
