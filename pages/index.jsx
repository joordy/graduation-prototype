import { supabase } from '_utils/database/init'

const Home = ({ userData, ...props }) => {
    console.log('user dataaaaa', userData)

    return (
        <>
            <h1 className="text-3xl">Homescreen</h1>
        </>
    )
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    console.log('user from server doei', user)

    if (!user) {
        return { props: {}, redirect: { destination: '/sign-in' } }
    }

    return { props: { userData: user } }
}

export default Home
