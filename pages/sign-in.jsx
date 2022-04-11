import { useState } from 'react'

import { supabase } from '_utils/auth/SupabaseClient'

import {
    useUserIsAuth,
    useSetUserIsAuth,
} from '_utils/atoms/userIsAuthenticated'
import { useUserData, useSetUserData } from '_utils/atoms/userData'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleLogin = async (e) => {
        // e.preventDefault()

        console.log(email)

        if (email.includes('@buildinamsterdam.com')) {
            const { user, session, error } = await supabase.auth.signIn({
                provider: 'google',
            })
            console.log({ user: user, session: session, error: error })
            if (error) {
                console.log(error)
            } else {
                setSubmitted(true)
            }
        }
        return
    }

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-grey-100">
            <h1 className="text-3xl">Hello world</h1>

            <div className="flex items-center justify-center bg-gray-800">
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ margin: 10 }}
                />
                <button onClick={() => handleLogin()} className="">
                    Sign In
                </button>
            </div>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (user) {
        return { props: {}, redirect: { destination: '/' } }
    }

    return { props: { user } }
}

export default SignIn
