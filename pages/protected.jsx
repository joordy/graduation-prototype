import { supabase } from '_utils/database/init'

const Protected = ({ user }) => {
    console.log({ user })

    return (
        <div style={{ maxWidth: '420px' }}>
            <h2>Hello from protected route</h2>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        return { props: {}, redirect: { destination: '/sign-in' } }
    }

    return { props: { user } }
}

export default Protected
