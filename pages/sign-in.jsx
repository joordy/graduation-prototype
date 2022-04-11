import { useState } from 'react'

import { supabase } from '_utils/auth/SupabaseClient'

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
    if (submitted) {
        return (
            <div>
                <h1>Please check your email to sign in</h1>
            </div>
        )
    }

    return (
        <div className="absolute top-0 -left-[300px] z-10 flex h-screen w-screen flex-col items-center justify-center bg-grey-100">
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

    console.log('user', user)

    if (user) {
        return { props: {}, redirect: { destination: '/' } }
    }

    return { props: { user } }
}

export default SignIn
