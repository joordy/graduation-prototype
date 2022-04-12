import { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'

import { PROJECT_DATA } from '_utils/siteData'

import { useToggleHeader, useSetToggleHeader } from '_utils/atoms/toggleHeader'

import NavElement from '_components/blocks/navigation/NavElement'

const Sidebar = ({ userData, projectData, ...props }) => {
    const navigationRef = useRef()

    const toggledHeader = useToggleHeader()
    const setToggledHeader = useSetToggleHeader()

    const widthAbove =
        navigationRef?.current?.getBoundingClientRect().width >= 207

    const toggle = () => {
        setToggledHeader(!toggledHeader)
    }

    const test = useMemo(() => {
        return navigationRef?.current?.getBoundingClientRect().width >= 299
    }, [navigationRef?.current])

    const navPadding = toggledHeader ? 'px-5 py-5' : 'px-11 py-5'
    const navWidth = toggledHeader ? 'w-20' : 'w-[300px]'

    return (
        <nav
            ref={navigationRef}
            className={`absolute h-screen rounded-r-2xl bg-white ${navWidth} ${navPadding}  duration-100 ease-in`}
        >
            <button
                onClick={toggle}
                className="absolute w-8 h-8 bg-white rounded-r-lg top-8 -right-8"
                style={{ zIndex: 1 }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6  ${toggledHeader ? 'rotate-180' : ''}`}
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
                </svg>
            </button>
            <div className="flex flex-col items-center justify-between h-full">
                <NavElement name={'ErrorDetect'} slug={'/'} />

                <ul className="block max-h-[75%] overflow-auto">
                    {PROJECT_DATA.map(({ icon, projectName, slug }, i) => {
                        return (
                            <li className="my-4 ">
                                <NavElement
                                    key={i}
                                    name={projectName}
                                    slug={`/projects/${slug}`}
                                    icon={icon}
                                />
                            </li>
                        )
                    })}
                </ul>

                {userData ? (
                    <Link href="/profile">
                        <a className="flex ">
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </span>
                            {!toggledHeader && (
                                <p className="px-2">
                                    Hi, {userData.user_metadata.name}!
                                </p>
                            )}
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
                            {!toggledHeader && <p>Log in</p>}
                        </a>
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Sidebar
