import { useState } from 'react'

import { supabase } from '_utils/database/init'

import Form from '_components/scopes/auth/Form'

export default function SignInPage({}) {
    const [formState, setFormState] = useState(false)

    const toggleClick = () => {
        setFormState(!formState)
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#ECEFF2] py-2  font-bold">
            <section className="px-4 py-8 bg-white rounded-lg shadow-sm shadow-slate-400">
                <header className="text-center">
                    <h1 className="text-2xl">Quickly</h1>
                </header>

                <main className="flex flex-col">
                    <Form />
                </main>
            </section>
            <section className="flex flex-col items-center mt-16 text-xs text-center font-body">
                <div className="my-2 w-[350px] rounded-md bg-white py-4 shadow-sm shadow-slate-400">
                    <h2 className="mb-2">Technical Director role:</h2>
                    <p className="font-normal">
                        <span>Email:</span> jmfronik@gmail.com
                    </p>
                    <p className="font-normal">
                        <span>Password:</span> Test123
                    </p>
                </div>
                <div className="my-2 w-[350px] rounded-md bg-white py-4 shadow-sm shadow-slate-400">
                    <h2 className="mb-2">Developer role:</h2>
                    <p className="font-normal">
                        <span>Email:</span> jordy@buildinamsterdam.com
                    </p>
                    <p className="font-normal">
                        <span>Password:</span> Test123
                    </p>
                </div>
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
