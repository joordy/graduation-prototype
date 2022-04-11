import { supabase } from '_utils/auth/SupabaseClient'

const Home = () => {
    return (
        <>
            <h1 className="text-3xl">Homescreen</h1>
        </>
    )
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        return { props: {}, redirect: { destination: '/sign-in' } }
    }

    return { props: { user } }
}

export default Home
