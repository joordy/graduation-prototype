import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Page from '_components/scopes/Page'

import { supabase } from '_utils/database/init'

const Profile = ({ user }) => {
    const router = useRouter()
    console.log('🚀 ~ file: profile.jsx ~ line 11 ~ Profile ~ router', router)
    const onHandleSignOut = async (e) => {
        const { error } = await supabase.auth.signOut()

        router.push('/sign-in')
    }
    return (
        <Page>
            <div className="flex flex-col">
                <h2>User Profile</h2>
                <code className="highlight">{user.email}</code>
                <div className="heading">Last Signed In:</div>
                <code className="highlight">
                    {new Date(user.last_sign_in_at).toLocaleString()}
                </code>
                <button onClick={onHandleSignOut}>Sign out</button>
                <Link href="/">
                    <a className="button">Go Home</a>
                </Link>
            </div>
        </Page>
    )
}

export async function getServerSideProps({ req, res }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        console.log('Please login.')
        return { props: {}, redirect: { destination: '/', permanent: false } }
    }

    return { props: { user } }
}

export default Profile
