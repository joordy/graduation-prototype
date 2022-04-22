import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import '_styles/globals.css'

import { supabase } from '_utils/database/init'
import { NOTIFICATION_DATA } from '_utils/database/dataset'
import { useToggleHeader } from '_utils/atoms/toggleHeader'
import { useUser, useSetUser } from '_utils/atoms/user'
import { useIsUserAuth, useSetIsUserAuth } from '_utils/atoms/isUserAuth'
import { useOpenSearch } from '_utils/atoms/openSearch'

import NotificationPopup from '_components/common/NotificationPopup'
import Sidebar from '_components/scopes/Navigation'
import Search from '_components/scopes/Search'

const App = ({ Component, pageProps }) => {
    const router = useRouter()

    const authState = useIsUserAuth()
    const userData = useUser()
    const openSearch = useOpenSearch()
    const toggledHeader = useToggleHeader()

    const setAuthState = useSetIsUserAuth()
    const setUserData = useSetUser()

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

    setTimeout(() => {
        const dummy = {
            projectName: 'Mammut',
            projectIcon: '/icons/mammut.ico',
            name: 'mammut',
            slug: '12345',
            intro: 'Contentful stopped working',
            errorMessage: '',
            codeFile: '',
            codeFunction: '',
            codeLine: '',
            priorityLevel: '',
        }
        toast(
            <NotificationPopup
                id={1234567}
                projectName={dummy.projectName}
                intro={dummy.intro}
                pathName={`notifications/${dummy.slug}`}
                icon={dummy.projectIcon}
            />,
            { toastId: 1234567 },
        )
    }, 7500000)

    if (router.pathname === '/sign-in') {
        return (
            <main>
                <Component {...pageProps} />
            </main>
        )
    }

    return (
        <div className="flex w-full">
            <ToastContainer
                position="top-right"
                autoClose={false}
                hideProgressBar={false}
                draggable={true}
                progress={undefined}
                closeOnClick
                pauseOnHover
            />

            <Sidebar
                userData={userData}
                notificationCounter={NOTIFICATION_DATA}
            />

            <Component {...pageProps} />

            {/* <dialog
                open={openSearch}
                className="absolute top-0 left-0 right-0 bottom-0 z-20 h-full w-full bg-grey-800/75 backdrop-blur-[2px]"
            >
                <Search data={NOTIFICATION_DATA} />
            </dialog> */}
        </div>
    )
}

export default App
