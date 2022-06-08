import { useState } from 'react'
import { useRouter } from 'next/router'

import { supabase } from '_utils/database/init'

const Form = ({}) => {
    const router = useRouter()

    const [errorState, setErrorState] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

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
            if (error.message) {
                setErrorMsg(error.message)
            }
        }

        router.push('/')
    }

    return (
        <form onSubmit={onHandleSignIn} className="flex flex-col mt-4">
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
                <label className="text-sm font-medium">Password</label>
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
                    className={
                        'border-b-grey-900 hover:bg-grey-700 rounded-md border bg-violetBlue py-2 text-sm text-white duration-150 ease-in hover:cursor-pointer ' +
                        (errorState ? '' : 'mt-4')
                    }
                />
            </fieldset>
        </form>
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

export default Form
