import { useState } from 'react'
import { useRouter } from 'next/router'

import { supabase } from '_utils/database/init'

export default function SignInPage({}) {
    const router = useRouter()

    const [formState, setFormState] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onHandleSignIn = async (e) => {
        e.preventDefault()

        const { user, session, error } = await supabase.auth.signIn({
            email: email,
            password: password,
        })

        router.push('/')
    }

    const toggleClick = () => {
        setFormState(!formState)
    }

    const onHandleRegister = async (e) => {
        e.preventDefault()

        const { data: userWithUsername } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single()

        if (userWithUsername) {
            throw new Error('User with email exists')
        }

        const { user, session, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            data: {
                projects: ['Mammut', 'Foam', 'Land of Ride', 'Aubade'],
                name: name,
                user_role: 'developer',
            },
        })

        const {
            data: dataObj,
            session: sess,
            error: err,
        } = await supabase.from('users').insert([
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                user_role: 'developer',
                uid: user.id,
                projects: ['Mammut', 'Foam', 'Land of Ride', 'Aubade'],
            },
        ])
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
                    <label>First name:</label>
                    <input
                        type="text"
                        className="border rounded-md"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </fieldset>
                <fieldset className="flex flex-col">
                    <label>Last name:</label>
                    <input
                        type="text"
                        className="border rounded-md"
                        onChange={(e) => setLastName(e.target.value)}
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

            <button onClick={toggleClick} className="mt-4 text-sm">
                {formState ? 'Sign in' : 'Sign up'}
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
