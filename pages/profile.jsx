import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { supabase } from '_utils/auth/SupabaseClient'

const Profile = () => {
    const [profile, setProfile] = useState(null)
    const router = useRouter()

    useEffect(() => {
        fetchProfile()
    }, [])

    const update = async () => {
        const { user, error } = await supabase.auth.update({
            data: {
                city: 'New York',
            },
        })
        console.log('user:', user)
    }

    const fetchProfile = async () => {
        const profileData = await supabase.auth.user()
        console.log('profileData: ', profileData)
        if (!profileData) {
            router.push('/sign-in')
        } else {
            setProfile(profileData)
        }
    }
    const signOut = async () => {
        await supabase.auth.signOut()
        router.push('/sign-in')
    }

    if (!profile) return null

    return (
        <div style={{ maxWidth: '420px', margin: '96px auto' }}>
            <h2>Hello, {profile.email}</h2>
            <p>User ID: {profile.id}</p>
            <button onClick={signOut}>Sign Out</button>
            <button onClick={update}>Set Attribute</button>
        </div>
    )
}

export default Profile
