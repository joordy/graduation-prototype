import { useState } from 'react'
import { useRouter } from 'next/router'

import { supabase } from '_utils/database/init'

export default function SignInPage({}) {
    const router = useRouter()
    console.log('🚀 ~ file: profile.jsx ~ line 11 ~ Profile ~ router', router)

    const [formState, setFormState] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onHandleSignIn = async (e) => {
        e.preventDefault()

        const { user, session, error } = await supabase.auth.signIn({
            email: email,
            password: password,
        })

        console.log({ user, session, error })

        router.push('/')
    }

    const onHandleRegister = async (e) => {
        e.preventDefault()

        const { user, session, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        console.log({ user, session, error })
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-2xl font-bold">
            <p>This is the signin page!</p>

            <form
                onSubmit={onHandleSignIn}
                className={`mt-4 ${formState ? 'hidden' : 'flex'} flex-col`}
            >
                <fieldset className="flex flex-col">
                    <label>Email</label>
                    <input
                        type="email"
                        className="border rounded-md"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>
                <fieldset className="flex flex-col">
                    <label>Password</label>
                    <input
                        type="password"
                        className="border rounded-md"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>
                <fieldset className="flex flex-col">
                    <input type="submit" className="mt-4 border rounded-md" />
                </fieldset>
            </form>
            <form
                onSubmit={onHandleRegister}
                className={`mt-4 ${formState ? 'flex' : 'hidden'} flex-col`}
            >
                <fieldset className="flex flex-col">
                    <label>Name</label>
                    <input
                        type="text"
                        className="border rounded-md"
                        onChange={(e) => setName(e.target.value)}
                    />
                </fieldset>
                <fieldset className="flex flex-col">
                    <label>Email</label>
                    <input
                        type="email"
                        className="border rounded-md"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>
                <fieldset className="flex flex-col">
                    <label>Password</label>
                    <input
                        type="password"
                        className="border rounded-md"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>
                <fieldset className="flex flex-col">
                    <input type="submit" className="mt-4 border rounded-md" />
                </fieldset>
            </form>
            <button
                onClick={(e) => setSignUpForm(!signUpForm)}
                className="mt-4 text-sm"
            >
                {setFormState ? 'Sign in' : 'Sign up'}
            </button>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (user) {
        return { props: { user }, redirect: { destination: '/' } }
    }

    return { props: {} }
}
