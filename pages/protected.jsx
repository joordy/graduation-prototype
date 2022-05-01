import { supabase } from '_utils/database/init'

const Protected = ({ userData, ...props }) => {
    return (
        <div style={{ maxWidth: '420px' }}>
            <h2>Hello from protected route</h2>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        return { props: {}, redirect: { destination: '/auth/sign-in' } }
    }

    return { props: { userData: user } }
}

export default Protected
