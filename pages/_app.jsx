import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import '_styles/globals.css'

import { supabase } from '_utils/database/init'

import { useToggleHeader } from '_utils/atoms/toggleHeader'
import { useUser, useSetUser } from '_utils/atoms/user'
import { useIsUserAuth, useSetIsUserAuth } from '_utils/atoms/isUserAuth'

import Notification from '_components/common/Notification'
import Sidebar from '_components/scopes/Sidebar'

const App = ({ Component, pageProps }) => {
    const router = useRouter()

    const authState = useIsUserAuth()
    const setAuthState = useSetIsUserAuth()
    const userData = useUser()
    const setUserData = useSetUser()
    const toggledHeader = useToggleHeader()

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                handleAuthChange(event, session)
                if (event === 'SIGNED_IN') {
                    setAuthState(true)
                    router.push('/profile')
                }
                if (event === 'SIGNED_OUT') {
                    setAuthState(false)
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

        if (!profileData) return

        setUserData(profileData)
    }

    fetchProfile()

    const checkUser = async () => {
        const user = await supabase.auth.user()

        if (user) {
            setAuthState(false)
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

    // setTimeout(() => {
    //     toast(
    //         <Notification
    //             id={1234567}
    //             projectName={'Mammut.com'}
    //             shortDescription={'Contentful stopped working'}
    //             pathName={'notifications/hellothere'}
    //         />,
    //         { toastId: 1234567 },
    //     )
    // }, 7500)

    if (router.pathname === '/sign-in') {
        return (
            <main>
                <Component {...pageProps} />
            </main>
        )
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                // autoClose={8500}
                autoClose={false}
                hideProgressBar={false}
                draggable={true}
                progress={undefined}
                closeOnClick
                pauseOnHover
            />

            <Sidebar userData={userData} />

            <main
                className={`
                z-1 relative flex h-screen flex-col 
                items-center justify-center 
                    ${toggledHeader ? 'left-20' : 'left-[300px]'}
                    ${
                        toggledHeader
                            ? 'w-[calc(100%-5rem)]'
                            : 'w-[calc(100%-300px)]'
                    } 
                    duration-200 ease-in
                `}
            >
                <Component {...pageProps} />
            </main>
        </>
    )
}

export default App
