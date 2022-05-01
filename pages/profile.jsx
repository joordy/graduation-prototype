import { useSession, getSession, signIn, signOut } from 'next-auth/react'

import { useRouter } from 'next/router'
import Head from 'next/head'

import { supabase } from '_utils/database/init'
import { PROJECT_DATA } from '_utils/database/dataset'
import Page from '_components/scopes/Page'

const Profile = ({ sessionData = {}, ...props }) => {
    console.log('page props: ', props)

    const { data: session } = useSession()

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
            <pre className="text-xs ">
                {JSON.stringify(sessionData, null, 2)}
            </pre>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const user = await getSession(ctx)
    console.log(user)

    if (!user) {
        return { props: {}, redirect: { destination: '/auth/sign-in' } }
    }

    return { props: { session: user } }
}

export default Profile
