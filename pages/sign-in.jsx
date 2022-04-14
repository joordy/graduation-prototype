import { useState } from 'react'

import { supabase } from '_utils/database/init'
import { useUser, useSetUser } from '_utils/atoms/user'

const SignIn = () => {
    const userData = useUser()
    const setUserData = useSetUser()

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)
    const [message, setMessage] = useState(false)

    const handleGoogleAuth = async () => {
        const { user, session, error } = await supabase.auth.signIn({
            provider: 'google',
        })

        if (error) console.log(error)

        setUserData(user)

        return { user, session, error }
    }

    const handleLogin = async (email) => {
        const { user, error } = await supabase.auth.signIn({
            email: email,
        })

        if (error) console.log(error)

        //         const { data, error } = await supabase
        //   .from('cities')
        //   .insert([
        //     { name: 'The Shire', country_id: 554 }
        //   ])
        setMessage('Check your email for the login link!')
    }

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-grey-100">
            {/* <h1 className="text-3xl">Hello world</h1> */}

            {/* <section className="flex bg-white">
                <div className="flex flex-col items-center justify-center bg-gray-800">
                    <input
                        className="border rounded-md"
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ margin: 10 }}
                    />
                    <button onClick={() => handleLogin()} className="">
                        Sign In
                    </button>
                </div>
            </section> */}
            <div className="flex bg-white">
                <div className="flex w-[400px] flex-col items-center justify-center rounded-md p-5">
                    <div className="w-full">
                        {errorMessage && <p>{errorMessage}</p>}
                        {message ? <p>{message}</p> : <p></p>}

                        <input
                            className="w-full p-2 my-2 border rounded-md"
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <button
                            className="w-full p-2 my-2 text-white rounded-md bg-grey-900"
                            onClick={(e) => {
                                e.preventDefault()
                                handleLogin(email)
                            }}
                            disabled={loading}
                        >
                            <span>
                                {loading ? 'Loading' : 'Send magic link'}
                            </span>
                        </button>
                    </div>

                    <div className="w-full">
                        <button
                            className="w-full p-2 my-2 bg-white border-2 rounded-md border-grey-900 text-grey-900"
                            onClick={handleGoogleAuth}
                        >
                            Or sign in with Google Auth
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (user) {
        return { props: {}, redirect: { destination: '/profile' } }
    }

    return { props: { userData: user } }
}

export default SignIn
