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
            icon: 'X',
            projectName: 'Mammut',
        },
        {
            icon: 'X',
            projectName: 'Foam',
        },
        {
            icon: 'X',
            projectName: 'Land of Ride',
        },
        {
            icon: 'X',
            projectName: 'Aubade',
        },
    ]

    const widthAbove =
        navigationRef?.current?.getBoundingClientRect().width >= 207

    const toggle = () => {
        setToggledHeader(!toggledHeader)
    }

    useEffect(() => {
        console.log(navigationRef?.current?.getBoundingClientRect()?.width)
        console.log(navigationRef?.current?.getBoundingClientRect())
    }, [toggledHeader, navigationRef?.current])
    return (
        <nav
            ref={navigationRef}
            className={`z-3 absolute flex  h-screen  flex-col items-center justify-between rounded-r-lg bg-fuchsia-400 py-5 ${
                toggledHeader ? 'px-5' : 'px-11'
            } ${toggledHeader ? 'w-20' : 'w-52'} duration-200 ease-in`}
        >
            <button
                onClick={toggle}
                // className="absolute w-6 h-8 rounded-r-lg z-4 top-12 -right-6 bg-lime-800"
            >
                &lt;
            </button>
            <div></div>
            <ul>
                {projects.map(({ icon, projectName }, i) => {
                    return (
                        <li index={i}>
                            <span className="mr-1">{icon}</span>
                            {!toggledHeader && <span>{projectName}</span>}
                        </li>
                    )
                })}

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
        </nav>
    )
}

const linkStyle = {
    marginRight: 10,
}

export default Sidebar
