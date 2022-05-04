import Link from 'next/link'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { getSession } from 'next-auth/react'

import { db } from '_utils/database/firebase'
import { NOTIFICATION_DATA, PROJECT_DATA } from '_utils/database/dataset'
import { useUserData, useSetUserData } from '_utils/atoms/userData'

import Page from '_components/scopes/Page'
import NotificationElement from '_components/blocks/NotificationElement'
import { useEffect } from 'react'

const Home = ({ data, userData, notificationData, ...props }) => {
    // console.log('page props: ', props)
    const setUserData = useSetUserData()

    useEffect(() => {
        setUserData(data)
    }, [])

    return (
        <Page topNav={true}>
            <header>
                <h1 className="mb-8 text-3xl font-bold">Notifications:</h1>
            </header>

            <section className="grid gap-12 xl:grid-cols-2">
                <p>notifications</p>
                <ul className="flex flex-col gap-y-4">
                    {notificationData.map((data, i) => {
                        return <NotificationElement key={i} hit={data} />
                    })}
                </ul>
            </section>
        </Page>
    )
}

export async function getServerSideProps(ctx) {
    const user = await getSession(ctx)

    if (!user) {
        return { props: {}, redirect: { destination: '/auth/sign-in' } }
    }

    const docRef = doc(db, 'users', user.user.uid)
    const docSnap = await getDoc(docRef)

    const selectedProjects = PROJECT_DATA.map((elem) => {
        return elem.projectName
    })

    const data = docSnap.exists() && docSnap.data()
    // console.log(typeof data === 'object')
    // if (typeof data === 'object' && user)
    checkData(data, user, selectedProjects)
    // if (typeof data == )
    // if ((!!data, user)) {
    // checkData(data, user, selectedProjects)
    // }

    return {
        props: {
            data: data,
            userData: user,
            projectData: PROJECT_DATA,
            notificationData: NOTIFICATION_DATA,
        },
    }
}

export default Home

const checkData = async (data, user, selectedProjects) => {
    const userObj = user?.user
    // const { user } = user
    // console.log('data', data)
    // console.log('user', user)

    // const userData = useUser()
    // const openSearch = useOpenSearch()
    // const toggledHeader = useToggleHeader()

    // const setAuthState = useSetIsUserAuth()

    if (data.uid && data.projects.length != 0) {
        console.log('hi')
        console.log('user & data', userObj, data)

        return data
    } else {
        const docRef = doc(db, 'users', userObj.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            console.log('bye')
            console.log('user', userObj)
            console.log('data', data)
            console.log('docSnap.data()', docSnap.data())
        }
        // const newData = await setDoc(
        //     doc(db, 'users', user.uid),
        //     {
        //         uid: user.uid,
        //         username: user.username,
        //         // projects: selectedProjects,
        //     },
        //     { merge: true },
        // )

        // console.log('bew data', newData)

        return
        // await setDoc(
        //     doc(db, 'users', user.user.uid),
        //     {
        //         uid: user.user.uid,
        //         username: user.user.username,
        //         projects: selectedProjects,
        //     },
        //     { merge: true },
        // )
        // return data
    }
}
