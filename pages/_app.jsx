import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'

import Link from 'next/link'

import 'react-toastify/dist/ReactToastify.css'
import '_styles/globals.css'

import { supabase } from '_utils/database/init'
import { NOTIFICATION_DATA, PROJECT_DATA } from '_utils/siteData'
import { useToggleHeader } from '_utils/atoms/toggleHeader'
import { useUser, useSetUser } from '_utils/atoms/user'
import { useIsUserAuth, useSetIsUserAuth } from '_utils/atoms/isUserAuth'
import { useOpenSearch } from '_utils/atoms/openSearch'

import Notification from '_components/common/Notification'
import Sidebar from '_components/scopes/Navigation'
import Search from '_components/scopes/Search'
import TopNavigation from '_components/scopes/TopNavigation'

const App = ({ Component, pageProps }) => {
    const router = useRouter()

    const authState = useIsUserAuth()
    const setAuthState = useSetIsUserAuth()

    const userData = useUser()
    const setUserData = useSetUser()

    const openSearch = useOpenSearch()

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

    const toggledHeader = useToggleHeader()

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
                className={`${
                    toggledHeader
                        ? 'close overflow-hidden'
                        : 'open overflow-auto'
                } h-screen md:absolute md:top-0 md:bottom-0 md:right-0  ${
                    toggledHeader ? 'md:left-[100px]' : 'md:left-[300px]'
                } delay-100 duration-[250ms] md:p-8`}
            >
                <TopNavigation />

                <Component {...pageProps} />
            </main>

            <dialog
                open={openSearch}
                className="absolute top-0 left-0 right-0 bottom-8 z-20 h-full w-full bg-grey-800/75 backdrop-blur-[2px]"
            >
                <Search data={NOTIFICATION_DATA} />
            </dialog>
        </>
    )
}

export default App
