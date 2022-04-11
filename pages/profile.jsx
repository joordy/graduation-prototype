import { useRouter } from 'next/router'

import { supabase } from '_utils/database/init'

const Profile = ({ userData, ...props }) => {
    const router = useRouter()

    const signOut = async () => {
        await supabase.auth.signOut()
        router.push('/sign-in')
    }

    console.log(userData)

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
    return (
        <div>
            <button onClick={updateData}>set profile data</button>
            <button onClick={signOut}>Sign Out</button>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        return { props: {}, redirect: { destination: '/sign-in' } }
    }

    return { props: { userData: user } }
}

export default Profile
