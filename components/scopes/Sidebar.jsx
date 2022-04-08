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

    const navPadding = toggledHeader ? 'px-5' : 'px-11'
    const navWidth = toggledHeader ? 'w-20' : 'w-[300px]'
    return (
        <nav
            ref={navigationRef}
            className={`absolute h-screen rounded-r-2xl ${navWidth} #{navPadding} bg-fuchsia-400 duration-200 ease-in`}
        >
            <button
                onClick={toggle}
                className="absolute w-8 h-8 rounded-r-lg top-8 -right-8 bg-fuchsia-400"
                style={{ zIndex: 1 }}
            >
                &lt;
            </button>
            <div className="flex flex-col items-center justify-between h-screen">
                <div></div>
                <ul>
                    {projects.map(({ icon, projectName, slug }, i) => {
                        return (
                            <li index={i} className="my-2 ">
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
                    )}
                </ul>

                {userData ? (
                    <Link href="/profile">
                        <a>{userData.user_metadata.name}</a>
                    </Link>
                ) : (
                    <span></span>
                )}
            </div>
        </nav>
    )
}

const linkStyle = {
    marginRight: 10,
}

export default Sidebar
