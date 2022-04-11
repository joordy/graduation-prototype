import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'

import Link from 'next/link'

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
                z-1 relative
                block flex h-screen flex-col items-center 
                justify-center overflow-auto 
                    ${toggledHeader ? 'left-20' : 'left-[300px]'}
                    ${
                        toggledHeader
                            ? 'w-[calc(100%-5rem)]'
                            : 'w-[calc(100%-300px)]'
                    } 
                    duration-100 ease-in
                `}
            >
                <button className="absolute right-[5rem] top-8 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white shadow-lg shadow-grey-100/50">
                    <Link href="/notifications">
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                        </a>
                    </Link>
                </button>
                <button className="absolute right-[2rem] top-8 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white shadow-lg shadow-grey-100/50">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
                <Component {...pageProps} />
            </main>
        </>
    )
}

export default App
