import { useRouter } from 'next/router'
import Head from 'next/head'

import { supabase } from '_utils/database/init'
import { PROJECT_DATA } from '_utils/siteData'
import Page from '_components/scopes/Page'

const Profile = ({ userData, projectData, ...props }) => {
    const router = useRouter()

    const signOut = async () => {
        await supabase.auth.signOut()
        router.push('/sign-in')
    }

    const updateData = async () => {
        const checkIfUserExist = await supabase
            .from('users')
            .select(userData.email)

        if (checkIfUserExist.error.message.includes('does not exist')) {
            const { data, error } = await supabase.from('users').insert([
                {
                    user_id: userData.id,
                    name: userData.email,
                    assigned_projects: ['mammut', 'foam', 'land of ride'],
                },
            ])
        }

        const { data, error } = await supabase
            .from('users')
            .update([
                {
                    assigned_projects: ['mammut', 'foam', 'land of ride'],
                },
            ])
            .match({ name: userData.email })

        console.log(data, error)
    }

    const handleSubmit = (e) => {}
    return (
        <Page topNav={true}>
            <Head>
                <title>Profile — Uptime Tracker</title>
            </Head>

            <div>
                <button onClick={updateData}>set profile data</button>
                <button onClick={signOut}>Sign Out</button>
                <pre className="text-xs ">
                    {JSON.stringify(userData, null, 2)}
                </pre>
            </div>
            <form onSubmit={handleSubmit}>
                <fieldset className="flex flex-col">
                    {projectData.map(({ projectName }, i) => {
                        return (
                            <label key={i}>
                                {projectName}
                                <input type="checkbox" text="ji" />
                            </label>
                        )
                    })}
                </fieldset>
            </form>
        </Page>
    )
}

export async function getServerSideProps({ req }) {
    const projectData = PROJECT_DATA
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        return { props: {}, redirect: { destination: '/sign-in' } }
    }

    return { props: { userData: user, projectData } }
}

export default Profile
