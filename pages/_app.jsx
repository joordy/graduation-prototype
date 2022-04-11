import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/router'

import 'react-toastify/dist/ReactToastify.css'
import '_styles/globals.css'

import { supabase } from '_utils/auth/SupabaseClient'

import {
    useUserIsAuth,
    useSetUserIsAuth,
} from '_utils/atoms/userIsAuthenticated'
import { useUserData, useSetUserData } from '_utils/atoms/userData'
import { useToggleHeader } from '_utils/atoms/toggleHeader'

import Sidebar from '_components/scopes/Sidebar'
import Notification from '_components/common/Notification'

const App = ({ user, Component, pageProps }) => {
    const router = useRouter()

    // console.log('🚀 ~ file: _app.jsx ~ line 21 ~ App ~ router', router)
    const [authenticatedState, setAuthenticatedState] =
        useState('not-authenticated')

    // Jotai States
    const authenticated = useUserIsAuth()
    const setHeaderState = useSetUserIsAuth()
    const userData = useUserData()
    const setUserData = useSetUserData()
    const toggledHeader = useToggleHeader()

    console.log('app.jsx', { authenticated: authenticated, userData: userData })

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

    const fetchProfile = async () => {
        const profileData = await supabase.auth.user()

        if (!profileData) return

        setUserData(profileData)
    }

    fetchProfile()

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
        toast(
            <Notification
                id={1234567}
                projectName={'Mammut.com'}
                shortDescription={'Contentful stopped working'}
                pathName={'notifications/hellothere'}
            />,
            { toastId: 1234567 },
        )
    }, 7500)

    // const width = toggledHeader ? 'w-[calc(100%-5rem)]' : 'w-[calc(100%-13rem)]'

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

            <Sidebar user={user} />

            {/* <Main width={width} /> */}

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

// export async function getInitialProps(appContext) {
//     console.log('hi', appContext)
//     return {
//         props: {
//             user: 'hi',
//         },
//     }
//     // const { user } = await supabase.auth.api.getUserByCookie(req)
//     // console.log(
//     //     '🚀 ~ file: _app.jsx ~ line 134 ~ getServerSideProps ~ user',
//     //     user,
//     // )

//     // return { props: { user } }
// }

export default App
