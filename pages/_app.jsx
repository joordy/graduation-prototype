import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { AuthProvider } from '_utils/context/auth'
import { supabase } from 'utils/database/init'

import Sidebar from '_components/scopes/sidebar/Sidebar'
import Search from '_components/scopes/global/Search'

import { useSetNotifications } from '_utils/atoms/notifications'

import 'react-toastify/dist/ReactToastify.css'
import '_styles/globals.css'

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
    const router = useRouter()
    const setNotifications = useSetNotifications()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const { data, error } = await supabase.from('notifications').select()

        if (error) throw error
        setNotifications(data)
    }

    return (
        <AuthProvider supabase={supabase}>
            <div className="flex justify-center w-full">
                {router.pathname !== '/sign-in' && (
                    <>
                        <Sidebar />

                        {/* 
                            <dialog 
                                open={openSearch} 
                                className="absolute top-0 left-0 right-0 bottom-0 z-20 h-full w-full bg-grey-800/75 backdrop-blur-[2px]"
                            >
                                <Search data={NOTIFICATION_DATA} />
                            </dialog> 
                        */}
                    </>
                )}

                <Component {...pageProps} sessionData={session} />
            </div>
        </AuthProvider>
    )
}

export default App
