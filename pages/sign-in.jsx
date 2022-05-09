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

        console.log({ user, session, error })

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
        })

        const { user: userObj, error: errorMsg } = await supabase.auth.update({
            data: {
                projects: ['Mammut', 'Foam', 'Land of Ride', 'Aubade'],
                firstName: firstName,
                lastName: lastName,
                role: 'developer',
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

        console.log({ user, session, error })
        console.log({ dataObj, sess, err })
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#ECEFF2] py-2 text-2xl font-bold">
            <section className="px-4 py-8 bg-white rounded-lg">
                <header className="text-center">
                    <h1>Loggly</h1>
                </header>

                <main className="flex flex-col">
                    <form
                        onSubmit={onHandleSignIn}
                        className={`mt-4 ${
                            formState ? 'hidden' : 'flex'
                        } flex-col `}
                    >
                        <fieldset className="flex flex-col mb-4">
                            <label className="text-sm font-medium">Email</label>
                            <input
                                name="email"
                                type="email"
                                className="border rounded-md"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="flex flex-col mb-4">
                            <label className="text-sm font-medium">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                className="border rounded-md"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="flex flex-col">
                            <input
                                type="submit"
                                className="py-2 mt-4 text-sm text-white border rounded-md border-b-grey-900 bg-grey-900"
                            />
                        </fieldset>
                    </form>

                    <form
                        onSubmit={onHandleRegister}
                        className={`mt-4 ${
                            formState ? 'flex' : 'hidden'
                        } flex-col`}
                    >
                        <fieldset className="flex flex-col mb-4">
                            <label className="text-sm font-medium">
                                First name:
                            </label>
                            <input
                                type="text"
                                className="border rounded-md"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="flex flex-col mb-4">
                            <label className="text-sm font-medium">
                                Last name:
                            </label>
                            <input
                                type="text"
                                className="border rounded-md"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="flex flex-col mb-4">
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                className="border rounded-md"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="flex flex-col mb-4">
                            <label className="text-sm font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                className="border rounded-md"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="flex flex-col">
                            <input
                                type="submit"
                                className="py-2 mt-4 text-sm text-white border rounded-md border-b-grey-900 bg-grey-900"
                            />
                        </fieldset>
                    </form>

                    <button onClick={toggleClick} className="mt-4 text-sm">
                        {formState ? 'Sign in' : 'Sign up'}
                    </button>
                </main>
            </section>
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
