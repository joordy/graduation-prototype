import { useEffect, useRef } from 'react'
import Link from 'next/link'

import { useUserIsAuth } from '_utils/atoms/userIsAuthenticated'
import { useUserData } from '_utils/atoms/userData'
import { useToggleHeader, useSetToggleHeader } from '_utils/atoms/toggleHeader'

const Sidebar = () => {
    const navigationRef = useRef()
    const authenticated = useUserIsAuth()
    const userData = useUserData()

    const toggledHeader = useToggleHeader()
    const setToggledHeader = useSetToggleHeader()

    const projects = [
        {
            icon: '/icons/mammut.ico',
            projectName: 'Mammut',
            slug: 'mammut',
        },
        {
            icon: '/icons/foam_icon.png',
            projectName: 'Foam',
            slug: 'foam',
        },
        {
            icon: '/icons/landofride.ico',
            projectName: 'Land of Ride',
            slug: 'land-of-ride',
        },
        {
            icon: '/icons/aubade_icon.png',
            projectName: 'Aubade',
            slug: 'aubade',
        },
    ]

    const widthAbove =
        navigationRef?.current?.getBoundingClientRect().width >= 207

    const toggle = () => {
        setToggledHeader(!toggledHeader)
    }

    // useEffect(() => {
    // console.log(navigationRef?.current?.getBoundingClientRect()?.width)
    // console.log(navigationRef?.current?.getBoundingClientRect())
    // }, [toggledHeader, navigationRef?.current])

    const navPadding = toggledHeader ? 'px-5 py-5' : 'px-11 py-5'
    const navWidth = toggledHeader ? 'w-20' : 'w-[300px]'

    return (
        <nav
            ref={navigationRef}
            className={`absolute h-screen rounded-r-2xl bg-white ${navWidth} ${navPadding}  duration-200 ease-in`}
        >
            <button
                onClick={toggle}
                className="absolute w-8 h-8 bg-white rounded-r-lg top-8 -right-8"
                style={{ zIndex: 1 }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${toggledHeader ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    />
                </svg>{' '}
            </button>
            <div className="flex flex-col items-center justify-between h-full">
                <Link href="/">
                    <a>
                        <h1>Uptime</h1>
                    </a>
                </Link>
                <ul>
                    {projects.map(({ icon, projectName, slug }, i) => {
                        return (
                            <li key={i} className="my-2 ">
                                <Link href={`/projects/${slug}`}>
                                    <a className="flex flex-row items-center">
                                        <img
                                            src={icon}
                                            alt={`icon of ${projectName}`}
                                            className="h-[32px] w-[32px]"
                                        />
                                        {!toggledHeader && (
                                            <span className="ml-2 ">
                                                {projectName}
                                            </span>
                                        )}
                                    </a>
                                </Link>
                            </li>
                        )
                    })}
                    <li>
                        <Link href="/notifications/">
                            <a style={linkStyle}>Notification center</a>
                        </Link>
                    </li>
                    {/* 
                    {widthAbove && !toggledHeader && !authenticated && (
                        <>
                            <li>
                                <Link href="/">
                                    <a style={linkStyle}>Home</a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/sign-in">
                                    <a style={linkStyle}>Sign In</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/protected">
                                    <a style={linkStyle}>Protected</a>
                                </Link>
                            </li>
                        </>
                    )} */}
                </ul>

                {userData ? (
                    <Link href="/profile">
                        <a className="text-hotpink">
                            Hi, {userData.user_metadata.name}!
                        </a>
                    </Link>
                ) : (
                    <Link href="/protected">
                        <a className="flex px-8 py-2 border rounded-md border-grey-900 stroke-grey-900 text-grey-900">
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 "
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                    />
                                </svg>
                            </span>
                            Log in
                        </a>
                    </Link>
                )}
            </div>
        </nav>
    )
}

const linkStyle = {
    marginRight: 10,
}

export default Sidebar
