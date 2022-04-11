import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { supabase } from '_utils/auth/SupabaseClient'
import { useUserData } from '_utils/atoms/userData'

const Profile = () => {
    const router = useRouter()

    const userData = useUserData()

    useEffect(() => {
        if (!userData) router.push('/sign-in')
    }, [])

    const signOut = async () => {
        await supabase.auth.signOut()
        router.push('/sign-in')
    }

    // const update = async () => {
    //     const { user, error } = await supabase.auth.update({
    //         data: {
    //             city: 'Amsterdam',
    //         },
    //     })
    // }

    if (!userData) return null

    return (
        <div style={{ maxWidth: '420px' }}>
            <h2>Hello, {userData.email}</h2>
            <p>User ID: {userData.id}</p>
            <button onClick={signOut}>Sign Out</button>
            {/* <button onClick={update}>Set Attribute</button> */}
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        return { props: {}, redirect: { destination: '/sign-in' } }
    }

    return { props: { user } }
}

export default Profile
