import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Page from '_components/scopes/global/Page'
import { useAuth } from '_utils/context/auth'

import { supabase } from '_utils/database/init'

const Profile = ({ user, userData }) => {
    const [openTab, setOpenTab] = useState(1)

    const data = useAuth()

    return (
        <Page topNav={true}>
            <section className="flex flex-col ">
                <header>
                    <h1 className="text-3xl font-bold ">Settings</h1>
                    <nav>
                        <ul
                            className="flex flex-row flex-wrap pt-3 mb-0 list-none border-b gap-x-4 border-grey-300"
                            role="tablist"
                        >
                            <li className="mr-2 -mb-px text-center">
                                <a
                                    className={
                                        'block py-3 text-xs  uppercase leading-normal ' +
                                        (openTab === 1
                                            ? 'border-b-2 font-bold'
                                            : '')
                                    }
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setOpenTab(1)
                                    }}
                                    data-toggle="tab"
                                    href="#link1"
                                    role="tablist"
                                >
                                    Profile
                                </a>
                            </li>
                            <li className="mr-2 -mb-px text-center">
                                <a
                                    className={
                                        'block py-3 text-xs  uppercase leading-normal ' +
                                        (openTab === 2
                                            ? 'border-b-2 font-bold'
                                            : '')
                                    }
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setOpenTab(2)
                                    }}
                                    data-toggle="tab"
                                    href="#link2"
                                    role="tablist"
                                >
                                    Settings
                                </a>
                            </li>
                            <li className="mr-2 -mb-px text-center">
                                <a
                                    className={
                                        'block py-3 text-xs  uppercase leading-normal ' +
                                        (openTab === 3
                                            ? 'border-b-2 font-bold'
                                            : '')
                                    }
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setOpenTab(3)
                                    }}
                                    data-toggle="tab"
                                    href="#link3"
                                    role="tablist"
                                >
                                    Options
                                </a>
                            </li>
                        </ul>
                    </nav>
                </header>

                <main className="flex flex-col mt-4">
                    <Tabs
                        color="pink"
                        openTab={openTab}
                        userData={userData}
                        user={user}
                    />
                </main>
            </section>
        </Page>
    )
}

const Tabs = ({ user, userData, openTab }) => {
    const router = useRouter()

    const onHandleClick = async () => {
        const { user, error } = await supabase.auth.update({
            data: {
                projects: ['Mammut', 'Foam', 'Land of Ride', 'Aubade'],
                role: userData.user_role,
                firstName: userData.firstName,
                lastName: userData.lastName,
            },
        })

        // console.log(user, error)
    }

    const onHandleSignOut = async (e) => {
        const { error: err } = await supabase.auth.signOut()

        if (err) console.error(err)
        router.push('/sign-in')
    }

    return (
        <aside className="flex flex-wrap">
            <div className="w-full">
                <div className="relative flex flex-col w-full min-w-0 mb-6 break-words">
                    <div className="flex-auto py-5">
                        <div className="tab-content tab-space">
                            <div
                                className={
                                    'flex flex-col items-start gap-4 ' +
                                    (openTab === 1 ? 'block' : 'hidden')
                                }
                                id="link1"
                            >
                                <p>
                                    Collaboratively administrate empowered
                                    markets via plug-and-play networks.
                                    Dynamically procrastinate B2C users after
                                    installed base benefits.
                                    <br />
                                    <br /> Dramatically visualize customer
                                    directed convergence without revolutionary
                                    ROI.
                                </p>
                                <button onClick={onHandleClick}>
                                    Update profile
                                </button>

                                <code className="highlight">
                                    {JSON.stringify(
                                        user.user_metadata,
                                        null,
                                        4,
                                    )}
                                </code>
                                <div className="heading">Last Signed In:</div>
                                <code className="highlight">
                                    {new Date(
                                        user.last_sign_in_at,
                                    ).toLocaleString()}
                                </code>
                                <button onClick={onHandleSignOut}>
                                    Sign out
                                </button>
                                <Link href="/">
                                    <a className="button">Go Home</a>
                                </Link>
                            </div>
                            <div
                                className={openTab === 2 ? 'block' : 'hidden'}
                                id="link2"
                            >
                                <p>
                                    Completely synergize resource taxing
                                    relationships via premier niche markets.
                                    Professionally cultivate one-to-one customer
                                    service with robust ideas.
                                    <br />
                                    <br />
                                    Dynamically innovate resource-leveling
                                    customer service for state of the art
                                    customer service.
                                </p>
                            </div>
                            <div
                                className={openTab === 3 ? 'block' : 'hidden'}
                                id="link3"
                            >
                                <p>
                                    Efficiently unleash cross-media information
                                    without cross-media value. Quickly maximize
                                    timely deliverables for real-time schemas.
                                    <br />
                                    <br /> Dramatically maintain
                                    clicks-and-mortar solutions without
                                    functional solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export async function getServerSideProps({ req, res }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('uid', user?.id)
        .single()

    if (!user) {
        return { props: {}, redirect: { destination: '/', permanent: false } }
    }

    return { props: { user, userData: data } }
}

export default Profile
