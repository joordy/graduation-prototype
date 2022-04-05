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
        <main className="flex flex-col items-center justify-center w-full h-screen">
            <h1 className="text-3xl">Hello world</h1>

            <div className="flex items-center justify-center bg-gray-800">
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ margin: 10 }}
                />
                <button onClick={() => handleLogin()} className="text-white">
                    Sign In
                </button>
            </div>
        </main>
    )
}

export default SignIn
