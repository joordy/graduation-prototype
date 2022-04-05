import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/router'

import 'react-toastify/dist/ReactToastify.css'
import '_styles/globals.css'

import { supabase } from '_utils/auth/SupabaseClient'
import {
    useUserIsAuthenticated,
    useSetUserIsAuthenticated,
} from '_utils/atoms/userIsAuthenticated'
import { useUserData, useSetUserData } from '_utils/atoms/userData'

import Sidebar from '_components/scopes/Sidebar'

const ToastMessage = ({ closeToast, props }) => {
    // console.log(props)
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
    const [profile, setProfile] = useState(null)
    const [authenticatedState, setAuthenticatedState] =
        useState('not-authenticated')

    const authenticated = useUserIsAuthenticated()
    const setHeaderState = useSetUserIsAuthenticated()
    const userData = useUserData()
    const setUserData = useSetUserData()

    console.log('Authenticated user', authenticatedState, authenticated)

    useEffect(() => {
        fetchProfile()

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

    const fetchProfile = async () => {
        const profileData = await supabase.auth.user()

        console.log('profileData from app.js: ', profileData)

        if (!profileData) return

        setUserData(profileData)
    }

    const checkUser = async () => {
        const user = await supabase.auth.user()

        if (user) {
            setAuthenticatedState('authenticated')
            setHeaderState(true)
        }
    }

    const handleAuthChange = async (event, session) => {
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
            <ToastContainer
                position="top-right"
                autoClose={8500}
                hideProgressBar={false}
                draggable={true}
                progress={undefined}
                closeOnClick
                pauseOnHover
            />

            <Sidebar />

            <main className="bg-gray-100 relative left-52 w-[calc(100%-13rem)] flex flex-col items-center justify-center h-screen">
                <Component {...pageProps} />
            </main>
        </>
    )
}

export default App
