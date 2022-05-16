import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'

import { AuthProvider } from '_utils/context/auth'
import { supabase } from 'utils/database/init'

import Sidebar from '_components/scopes/navigation/Navigation'
import Popup from '_components/common/notifications/Popup'
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

    // setTimeout(() => {
    //     const dummy = {
    //         projectName: 'Mammut',
    //         projectIcon: '/icons/mammut.ico',
    //         name: 'mammut',
    //         slug: '12345',
    //         intro: 'Contentful stopped working',
    //         errorMessage: '',
    //         codeFile: '',
    //         codeFunction: '',
    //         codeLine: '',
    //         priorityLevel: '',
    //     }
    //     toast(
    //         <Popup
    //             id={1234567}
    //             projectName={dummy.projectName}
    //             intro={dummy.intro}
    //             pathName={`notifications/${dummy.slug}`}
    //             icon={dummy.projectIcon}
    //         />,
    //         { toastId: 1234567 },
    //     )
    // }, 7500000)

    return (
        <AuthProvider supabase={supabase}>
            <div className="flex justify-center w-full">
                {router.pathname !== '/sign-in' && (
                    <>
                        <ToastContainer
                            position="top-right"
                            autoClose={false}
                            hideProgressBar={false}
                            draggable={true}
                            progress={undefined}
                            closeOnClick
                            pauseOnHover
                        />

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
