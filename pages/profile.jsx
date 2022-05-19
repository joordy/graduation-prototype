import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Page from '_components/scopes/global/Page'
import { useAuth } from '_utils/context/auth'

import { supabase } from '_utils/database/init'

const Profile = ({ user, userData, projects, ...props }) => {
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
                        projects={projects}
                    />
                </main>
            </section>
        </Page>
    )
}

const Tabs = ({ user, userData, openTab, projects }) => {
    // const router = useRouter()

    // const onHandleClick = async () => {
    //     const { user, error } = await supabase.auth.update({
    //         data: {
    //             projects: ['Mammut', 'Foam', 'Land of Ride', 'Aubade'],
    //             role: userData.user_role,
    //             firstName: userData.firstName,
    //             lastName: userData.lastName,
    //         },
    //     })

    //     // console.log(user, error)
    // }

    // const onHandleSignOut = async (e) => {
    //     const { error: err } = await supabase.auth.signOut()

    //     if (err) console.error(err)
    //     router.push('/sign-in')
    // }

    // console.log(user.user_metadata.projects)

    const [allChecked, setAllChecked] = useState(false)

    return (
        <aside className="flex flex-wrap">
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words">
                <div
                    className={
                        'flex flex-col items-start gap-4 ' +
                        (openTab === 1 ? 'block' : 'hidden')
                    }
                    id="link1"
                >
                    <section className="w-full py-4 border-b-2 border-b-grey-500">
                        {/* <p>Profile</p> */}

                        <article className="flex justify-between w-full ">
                            <div>
                                <h2 className="text-2xl font-bold ">
                                    Your projects
                                </h2>
                                <p className="mt-2 w-[80%] text-grey-500">
                                    Select the projects you want to see in the
                                    navigation bar
                                </p>
                            </div>
                            <form className="w-[50%] ">
                                <fieldset className="flex flex-col">
                                    {projects.map((project, i) => {
                                        return (
                                            <CheckboxElement
                                                key={i}
                                                isChecked={allChecked}
                                                project={project}
                                                user={user}
                                            />
                                        )
                                    })}
                                    <label>
                                        <input
                                            type="checkbox"
                                            onClick={(e) =>
                                                setAllChecked(e.target.checked)
                                            }
                                        />{' '}
                                        Select all
                                    </label>
                                </fieldset>
                            </form>
                        </article>
                    </section>
                </div>
                <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
                    <SettingsTab user={user} userData={userData} />
                </div>
                <div className={openTab === 3 ? 'block' : 'hidden'} id="link3">
                    <SettingsTab user={user} userData={userData} />
                </div>
            </div>
        </aside>
    )
}

const CheckboxElement = ({ isChecked, project, user }) => {
    const [checked, setChecked] = useState(isChecked)

    // console.log(user?.user_metadata?.projects.indexOf(project.projectName))
    // console.log(user?.user_metadata?.projects)
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={
                        isChecked
                            ? true
                            : user?.user_metadata?.projects?.indexOf(
                                  project?.projectName,
                              ) !== -1
                            ? true
                            : checked
                    }
                    onChange={(e) => setChecked(e.target.checked)}
                />
                <span>{project.projectName}</span>
            </label>
        </div>
    )
}

const SettingsTab = ({ user, userData }) => {
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
        <div className="flex flex-col justify-start">
            <p>
                Collaboratively administrate empowered markets via plug-and-play
                networks. Dynamically procrastinate B2C users after installed
                base benefits.
                <br />
                <br /> Dramatically visualize customer directed convergence
                without revolutionary ROI.
            </p>
            <button onClick={onHandleClick}>Update profile</button>

            <code className="highlight">
                {JSON.stringify(user?.user_metadata, null, 4)}
            </code>
            <div className="heading">Last Signed In:</div>
            <code className="highlight">
                {new Date(user?.last_sign_in_at).toLocaleString()}
            </code>
            <button onClick={onHandleSignOut}>Sign out</button>
            <Link href="/">
                <a className="button">Go Home</a>
            </Link>
        </div>
    )
}

export async function getServerSideProps({ req, res }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('uid', user?.id)
        .single()

    const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select()
    console.log(
        '🚀 ~ file: profile.jsx ~ line 222 ~ getServerSideProps ~ projectData',
        projectData,
    )

    if (!user || !projectData) {
        return { props: {}, redirect: { destination: '/', permanent: false } }
    }

    return { props: { user, userData: data, projects: projectData } }
}

export default Profile
