import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Page from '_components/scopes/global/Page'

import { supabase } from '_utils/database/init'
import Input from '_components/blocks/Input'

const Profile = ({ user, userData, projects, ...props }) => {
    const [openTab, setOpenTab] = useState(1)

    const router = useRouter()

    const onHandleSignOut = async (e) => {
        const { error: err } = await supabase.auth.signOut()

        if (err) console.error(err)
        router.push('/sign-in')
    }

    const developerRole = user?.user_metadata?.role === 'Developer'
    const directorRole = user?.user_metadata?.role === 'Technical Director'
    return (
        <Page topNav={true}>
            <section className="flex flex-col ">
                <header>
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold ">Settings</h1>
                        <button
                            className="duration-150 ease-in border-b-2 hover:opacity-75"
                            onClick={onHandleSignOut}
                        >
                            Sign out
                        </button>
                    </div>
                    <nav>
                        <ul
                            className="flex flex-row flex-wrap pt-3 mb-0 list-none border-b gap-x-4 border-slate-300"
                            role="tablist"
                        >
                            <li className="mr-2 -mb-px text-center">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setOpenTab(1)
                                    }}
                                    className={
                                        'block py-3 text-xs  uppercase leading-normal ' +
                                        (openTab === 1
                                            ? ' border-b-2 border-b-slate-800 font-bold text-slate-800'
                                            : '')
                                    }
                                >
                                    Profile
                                </button>
                            </li>
                            <li className="mr-2 -mb-px text-center">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setOpenTab(2)
                                    }}
                                    className={
                                        'block py-3 text-xs  uppercase leading-normal ' +
                                        (openTab === 2
                                            ? ' border-b-2 border-b-slate-800 font-bold text-slate-800'
                                            : '')
                                    }
                                >
                                    {user?.user_metadata?.role !==
                                    'Technical Director'
                                        ? 'Settings'
                                        : 'Application settings'}
                                </button>
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
                        developerRole={developerRole}
                        directorRole={directorRole}
                    />
                </main>
            </section>
        </Page>
    )
}

const Tabs = ({
    user,
    userData,
    openTab,
    projects,
    developerRole,
    directorRole,
}) => {
    return (
        <aside className="flex flex-wrap">
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words">
                <div
                    className={
                        'flex flex-col items-start gap-4 ' +
                        (openTab === 1 ? 'block' : 'hidden')
                    }
                >
                    <ProfileSettingsTab user={user} projects={projects} />
                </div>
                <div
                    className={
                        'flex flex-col items-start gap-4 ' +
                        (openTab === 2 ? 'block' : 'hidden')
                    }
                >
                    {directorRole && (
                        <ProjectSettingsTab user={user} userData={userData} />
                    )}
                    {developerRole && (
                        <SettingsTab user={user} userData={userData} />
                    )}
                </div>
            </div>
        </aside>
    )
}

const ProfileSettingsTab = ({ user, projects }) => {
    const obj = {}

    const [checkboxes, setCheckboxes] = useState(obj)

    return (
        <>
            <section className="w-full py-2 ">
                <article className="flex justify-between w-full px-4 py-8 bg-white border rounded-lg shadow-sm shadow-slate-300">
                    <div>
                        <h2 className="text-xl font-bold ">Your projects</h2>
                        <p className="mt-2 text-sm opacity-75 w-96">
                            Select the projects you want to see in the
                            navigation bar
                        </p>
                    </div>
                    <form
                        className="flex w-[50%] items-end justify-between"
                        onSubmit={onHandleSubmit}
                    >
                        <fieldset className="flex flex-col">
                            {projects.map((project, i) => {
                                const { projectName } = project
                                return (
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    checkboxes[projectName]
                                                        ? true
                                                        : user?.user_metadata?.projects?.indexOf(
                                                              projectName,
                                                          ) !== -1
                                                        ? true
                                                        : checked
                                                }
                                                onChange={(e) =>
                                                    setCheckboxes({
                                                        [projectName]:
                                                            e.target.checked,
                                                    })
                                                }
                                            />
                                            <span>{projectName}</span>
                                        </label>
                                    </div>
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
                        <input
                            type="submit"
                            value="Save project settings"
                            className="h-10 w-[175px] rounded-lg bg-blue-500 py-2 text-sm text-white duration-150 ease-in hover:cursor-pointer hover:opacity-80"
                        />
                    </form>
                </article>
            </section>

            <section className="w-full py-2">
                <article className="flex justify-between w-full px-4 py-8 bg-white border rounded-lg shadow-sm shadow-slate-300">
                    <div>
                        <h2 className="text-xl font-bold ">Profile image</h2>
                        <p className="mt-2 text-sm opacity-75 w-96">
                            Change your profile picture so that other users can
                            see it when you are working on a notification.
                        </p>
                    </div>

                    <form className="flex w-[50%] items-end justify-between">
                        <input type="file" name="" />
                        <input
                            type="submit"
                            value="Upload profile image"
                            className="h-10 w-[175px] rounded-lg bg-blue-500 py-2 text-sm text-white duration-150 ease-in hover:cursor-pointer hover:opacity-80"
                        />
                    </form>
                </article>
            </section>
        </>
    )
}

const ProjectSettingsTab = ({}) => {
    const [submitted, setSubmitted] = useState(false)
    const [msg, setMsg] = useState(null)
    const [errorState, setErrorState] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onHandleRegister = async (e) => {
        e.preventDefault()

        const { data: userWithUsername } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single()

        if (!userWithUsername) {
            setSubmitted(true)
            setMsg(
                `Please verify the users email address which you've just registered.`,
            )
        } else {
            setErrorState(true)
            setErrorMsg('This email address already exists')

            throw new Error('User with email exists')
        }

        const { user, session, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        const { user: userObj, error: errorMsg } = await supabase.auth.update({
            data: {
                projects: ['Mammut', 'Foam', 'Land of Ride', 'Aubade'],
                firstName: firstName,
                lastName: lastName,
                role: 'Developer',
            },
        })

        const {
            data: dataObj,
            session: sess,
            error: err,
        } = await supabase.from('users').insert([
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                user_role: 'Developer',
                uid: user.id,
                projects: ['Mammut', 'Foam', 'Land of Ride', 'Aubade'],
            },
        ])
    }

    return (
        <>
            <article className="border-b-raisinBlack grid w-full grid-cols-[minmax(100px,_1fr)_minmax(200px,_3fr)] rounded-lg border border-b-2 bg-white px-4 py-8 shadow-sm shadow-slate-300">
                <div className="flex flex-col">
                    <h2 className="mt-4 text-xl font-bold">
                        Register new user
                    </h2>
                    <p className="pr-12 mt-2 text-sm opacity-75">
                        Register new users to the application with their BiA
                        account.
                    </p>
                </div>
                <form className="mt-1" onSubmit={onHandleRegister}>
                    <fieldset className="w-full">
                        <Input
                            label="First name:"
                            type="text"
                            name="firstName"
                            placeholder="John"
                            styles="flex flex-col my-2 tablet:mb-2 tablet:mx-0 tablet:items-center tablet:flex-row"
                            inputStyles="px-1 py-2 bg-transparent border-b-2 border-b-raisinBlack w-full tablet:ml-4"
                            textStyles="tablet:w-[15rem] font-bold"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input
                            label="Last name:"
                            type="text"
                            name="lastName"
                            placeholder="Doe"
                            styles="flex flex-col my-2 tablet:mb-2 tablet:mx-0 tablet:items-center tablet:flex-row"
                            inputStyles="px-1 py-2 bg-transparent border-b-2 border-b-raisinBlack w-full tablet:ml-4"
                            textStyles="tablet:w-[15rem] font-bold"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <Input
                            label="User email:"
                            type="email"
                            name="userEmail"
                            placeholder="john@buildinamsterdam.com"
                            styles="flex flex-col my-2 tablet:mb-2 tablet:mx-0 tablet:items-center tablet:flex-row"
                            inputStyles="px-1 py-2 bg-transparent border-b-2 border-b-raisinBlack w-full tablet:ml-4"
                            textStyles="tablet:w-[15rem] font-bold"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            label="Password"
                            type="password"
                            name="domain"
                            placeholder="****"
                            styles="flex flex-col my-2 tablet:mb-2 tablet:mx-0 tablet:items-center tablet:flex-row"
                            inputStyles="px-1 py-2 bg-transparent border-b-2 border-b-raisinBlack w-full tablet:ml-4"
                            textStyles="tablet:w-[15rem] font-bold"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <VerifyEmail submitted={submitted} msg={msg} />

                        <Errors errorState={errorState} errorMsg={errorMsg} />

                        <input
                            type="submit"
                            value="Add new user"
                            className="mt-10 h-10 w-[175px] rounded-lg bg-blue-500 py-2 text-sm text-white duration-150 ease-in hover:cursor-pointer hover:opacity-80"
                        />
                    </fieldset>
                </form>
            </article>
            <article className="border-b-raisinBlack grid w-full grid-cols-[minmax(100px,_1fr)_minmax(200px,_3fr)] rounded-lg border border-b-2 bg-white px-4 py-8 shadow-sm shadow-slate-300">
                <div className="flex flex-col">
                    <h2 className="mt-4 text-xl font-bold">Add project</h2>
                    <p className="pr-12 mt-2 text-sm opacity-75">
                        Add new projects for the developers.
                    </p>
                </div>
                <form className="mt-1">
                    <fieldset className="w-full">
                        <Input
                            label="Project name:"
                            type="text"
                            name="projectName"
                            placeholder="Mammut, Flying Papers, Secrid..."
                            styles="flex flex-col my-2 tablet:mb-2 tablet:mx-0 tablet:items-center tablet:flex-row"
                            inputStyles="px-1 py-2 bg-transparent border-b-2 border-b-raisinBlack w-full tablet:ml-4"
                            textStyles="tablet:w-[15rem] font-bold"
                        />
                        <Input
                            label="Domain:"
                            type="text"
                            name="domain"
                            placeholder="bia.com"
                            styles="flex flex-col my-2 tablet:mb-2 tablet:mx-0 tablet:items-center tablet:flex-row"
                            inputStyles="px-1 py-2 bg-transparent border-b-2 border-b-raisinBlack w-full tablet:ml-4"
                            textStyles="tablet:w-[15rem] font-bold"
                        />
                        <Input
                            label="Project slug:"
                            type="text"
                            name="slug"
                            placeholder="slug"
                            styles="flex flex-col my-2 tablet:mb-2 tablet:mx-0 tablet:items-center tablet:flex-row"
                            inputStyles="px-1 py-2 bg-transparent border-b-2 border-b-raisinBlack w-full tablet:ml-4"
                            textStyles="tablet:w-[15rem] font-bold"
                        />

                        <Input
                            label="Project connections:"
                            type="text"
                            name="slug"
                            placeholder="Connection type"
                            styles="flex flex-col my-2 tablet:mb-2 tablet:mx-0 tablet:items-center tablet:flex-row"
                            inputStyles="px-1 py-2 bg-transparent border-b-2 border-b-raisinBlack w-full tablet:ml-4"
                            textStyles="tablet:w-[15rem] font-bold"
                        />

                        {/* <Input /> */}

                        <input
                            type="submit"
                            value="Add new project"
                            className="mt-10 h-10 w-[175px] rounded-lg bg-blue-500 py-2 text-sm text-white duration-150 ease-in hover:cursor-pointer hover:opacity-80"
                        />
                    </fieldset>
                </form>
            </article>
        </>
    )
}

const SettingsTab = ({ user, userData }) => {
    const router = useRouter()

    const onHandleClick = async () => {
        const { user, error } = await supabase.auth.update({
            data: {
                projects: ['Mammut', 'Foam', 'Land of Ride', 'Aubade'],
                role: 'Technical Director',
                firstName: userData.firstName,
                lastName: userData.lastName,
            },
        })
    }

    function eraseCookie(name) {
        document.cookie = name + '=; Max-Age=0'
    }

    const onHandleSignOut = async (e) => {
        const { error: err } = await supabase.auth.signOut()

        localStorage.removeItem('supabase.auth.token')

        eraseCookie('sb-access-token')
        eraseCookie('sb-refresh-token')

        if (err) console.error(err)
        router.push('/sign-in')
    }

    return (
        <div className="flex flex-col justify-start">
            <p>
                Collaboratively administrate empowered markets via plug-and-play
                networks. Dynamically procrastinate B2C users after installed
                base benefits. Dramatically visualize customer directed
                convergence without revolutionary ROI.
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

const VerifyEmail = ({ submitted, msg }) => {
    return (
        submitted && (
            <p className="mt-8 text-sm italic font-light text-left ">{msg}</p>
        )
    )
}

const Errors = ({ errorState, errorMsg }) => {
    return (
        errorState && (
            <p className="mb-2 text-sm font-medium text-center text-red">
                {errorMsg}
            </p>
        )
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

    if (!user || !projectData) {
        return { props: {}, redirect: { destination: '/', permanent: false } }
    }

    return { props: { user, userData: data, projects: projectData } }
}

export default Profile
