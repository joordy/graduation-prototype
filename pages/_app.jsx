import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Link from 'next/link'
import { useRouter } from 'next/router'

import 'react-toastify/dist/ReactToastify.css'
import './../styles/globals.css'

import { supabase } from '_utils/auth/SupabaseClient'
import {
    useAuthenticatedUser,
    useSetAuthenticatedUser,
} from '_utils/atoms/authenticatedUser'

const ToastMessage = ({ closeToast, props }) => {
    console.log(props)
    return (
        <>
            <a href="/page-two">
                <h1>Mammut.com</h1>
                <p>Contentful stopped working</p>
            </a>
            <div>
                <button>View details</button>
                <button onClick={closeToast}>Close</button>
            </div>
        </>
    )
}

const App = ({ Component, pageProps }) => {
    const router = useRouter()
    const [authenticatedState, setAuthenticatedState] =
        useState('not-authenticated')

    const setHeaderState = useSetAuthenticatedUser()
    const headerState = useAuthenticatedUser()

    console.log(headerState)

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                handleAuthChange(event, session)
                if (event === 'SIGNED_IN') {
                    setAuthenticatedState(true)
                    setHeaderState(true)
                    router.push('/profile')
                }
                if (event === 'SIGNED_OUT') {
                    setHeaderState(false)
                    setAuthenticatedState(false)
                }
            },
        )
        checkUser()
        return () => {
            authListener.unsubscribe()
        }
    }, [])
    async function checkUser() {
        const user = await supabase.auth.user()
        console.log(user)
        if (user) {
            setAuthenticatedState('authenticated')
        }
    }

    async function handleAuthChange(event, session) {
        await fetch('/api/auth', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ event, session }),
        })
    }

    setTimeout(() => {
        toast(<ToastMessage id={1234567} />, { toastId: 1234567 })
    }, 750000)

    return (
        <>
            <nav style={navStyle}>
                <Link href="/">
                    <a style={linkStyle}>Home</a>
                </Link>
                <Link href="/profile">
                    <a style={linkStyle}>Profile</a>
                </Link>
                {authenticatedState === 'not-authenticated' && (
                    <Link href="/sign-in">
                        <a style={linkStyle}>Sign In</a>
                    </Link>
                )}
                <Link href="/protected">
                    <a style={linkStyle}>Protected</a>
                </Link>
            </nav>
            <ToastContainer
                position="top-right"
                autoClose={8500}
                hideProgressBar={false}
                draggable={true}
                progress={undefined}
                closeOnClick
                pauseOnHover
            />
            <Component {...pageProps} />
        </>
    )
}

const navStyle = {
    margin: 20,
}

const linkStyle = {
    marginRight: 10,
}

export default App
