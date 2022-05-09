import { useState } from 'react'
import { useRouter } from 'next/router'

import { supabase } from '_utils/database/init'

export default function SignInPage({}) {
    const router = useRouter()

    const [submitted, setSubmitted] = useState(false)
    const [msg, setMsg] = useState(null)
    const [errorState, setErrorState] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    const [formState, setFormState] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onHandleSignIn = async (e) => {
        e.preventDefault()
        setErrorState(false)

        if (e.target[1].value === '' || e.target[3].value === '') {
            setErrorState(true)
            setErrorMsg('Please fill in the details')
        }

        const { user, session, error } = await supabase.auth.signIn({
            email: email,
            password: password,
        })

        if (error) {
            setErrorState(true)
            console.log(error)
            if (error.message) {
                setErrorMsg(error.message)
            }
        }
        // console.log({ user, session, error })

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

        if (!userWithUsername) {
            setSubmitted(true)
            setMsg(`Please verify your email you've just received.`)
        } else {
            setErrorState(true)
            setErrorMsg('This email address already exists')

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
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#ECEFF2] py-2  font-bold">
            <section className="px-4 py-8 bg-white rounded-lg shadow-lg">
                <header className="text-center">
                    <h1 className="text-2xl">Loggly</h1>
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
                                className="w-[80vw] max-w-xs rounded-md border p-2 text-sm"
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
                                className="w-[80vw] max-w-xs rounded-md border p-2 text-sm"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>
                        <Errors errorState={errorState} errorMsg={errorMsg} />

                        <fieldset className="flex flex-col">
                            <input
                                type="submit"
                                className={`${errorState ? '' : 'mt-4'}
                                rounded-md border border-b-grey-900 bg-grey-900 py-2 text-sm text-white`}
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
                                name="firstname"
                                type="text"
                                className="w-[80vw] max-w-xs rounded-md border p-2 text-sm"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="flex flex-col mb-4">
                            <label className="text-sm font-medium">
                                Last name:
                            </label>
                            <input
                                name="lastname"
                                type="text"
                                className="w-[80vw] max-w-xs rounded-md border p-2 text-sm"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="flex flex-col mb-4">
                            <label className="text-sm font-medium">Email</label>
                            <input
                                name="email"
                                type="email"
                                className="w-[80vw] max-w-xs rounded-md border p-2 text-sm"
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
                                className="w-[80vw] max-w-xs rounded-md border p-2 text-sm"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>

                        <VerifyEmail submitted={submitted} msg={msg} />

                        <Errors errorState={errorState} errorMsg={errorMsg} />

                        <fieldset className="flex flex-col">
                            <input
                                type="submit"
                                className={`py-2 ${
                                    errorState ? '' : 'mt-4'
                                } rounded-md border border-b-grey-900 bg-grey-900 text-sm text-white`}
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

const VerifyEmail = ({ submitted, msg }) => {
    return (
        submitted && (
            <p className="mt-4 text-sm font-light text-center">{msg}</p>
        )
    )
}

const Errors = ({ errorState, errorMsg }) => {
    return (
        errorState && (
            <p className="mb-2 text-sm font-medium text-center text-red">
                {errorMsg}
            </p>
        )
    )
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (user) {
        return { props: { user }, redirect: { destination: '/' } }
    }

    return { props: {} }
}
