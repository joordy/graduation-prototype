import { useEffect, useState, useRef, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { PROJECT_DATA } from '_utils/database/dataset'

import { useToggleHeader, useSetToggleHeader } from '_utils/atoms/toggleHeader'
import { useUserData } from '_utils/atoms/userData'

const Sidebar = ({ notificationCounter, ...props }) => {
    const { query } = useRouter()
    const { data: session } = useSession()

    const navigationRef = useRef()

    const userData = useUserData()

    const projectData = useMemo(() => {
        return PROJECT_DATA.filter((element, i) => {
            if (userData?.projects) {
                return element?.projectName === userData?.projects[i]
            } else {
                return element?.projectName
            }
        })
    }, [userData, PROJECT_DATA])

    const toggledHeader = useToggleHeader()
    const setToggledHeader = useSetToggleHeader()

    const [navWidth, setNavWidth] = useState(0)
    const toggle = () => {
        setToggledHeader(!toggledHeader)
    }

    const elementsCount = (data, selected) => {
        return data.filter((item) => {
            return item.projectName === selected
        })
    }

    useEffect(() => {
        setNavWidth(navigationRef.current?.getBoundingClientRect().width)
    }, [navigationRef?.current?.getBoundingClientRect().width])

    return (
        <nav
            className={`z-100 fixed flex w-5/6 flex-col items-center justify-between overflow-y-auto bg-[#F1F3F4] px-8  py-16 shadow-[0_0_30px_-15px_rgba(0,0,0,0.3)] duration-[250ms] ease-in md:relative md:left-0 md:h-screen md:px-4 md:pt-8 md:pb-16 ${
                toggledHeader ? 'md:w-[100px]' : 'md:w-[300px]'
            } fixed -left-[100vw] top-0 bottom-0 md:overflow-visible ${
                toggledHeader && 'left-[0]'
            }`}
        >
            <button
                onClick={toggle}
                className="absolute left-4 top-8 z-10 md:right-[-1.5rem] md:left-[unset] md:h-[2rem] md:w-[1.5rem] md:rounded-r-lg md:bg-[#F1F3F4] md:shadow-[0_0_30px_-15px_rgba(0,0,0,0.3)]"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="block w-6 h-6 md:hidden"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`hidden h-6 w-6 duration-150 md:block ${
                        toggledHeader ? 'md:rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            <div className="w-full">
                <Link href="/">
                    <a className="mb-6 flex h-[32px] w-[32px] p-2 font-extrabold">
                        Loggly
                    </a>
                </Link>

                <ul
                    ref={navigationRef}
                    className={`flex max-h-[100%] flex-col gap-4 ${
                        toggledHeader ? 'w-[48px] pl-0' : 'w-full pl-[0]'
                    } overflow-y-auto overflow-x-hidden duration-[250ms] ease-in`}
                >
                    {projectData.map(({ icon, projectName, slug }, i) => {
                        const activePath = query.project === slug

                        const counter = elementsCount(
                            notificationCounter,
                            projectName,
                        )

                        return (
                            <li
                                key={i}
                                className={`relative flex w-['inherit'] rounded-lg p-2 text-sm font-medium ${
                                    activePath && 'bg-white'
                                }`}
                            >
                                <Link href={`/projects/${slug}`}>
                                    <a>
                                        <div
                                            className={`flex flex-row items-center`}
                                        >
                                            {icon && (
                                                <img
                                                    src={icon}
                                                    alt={`icon of ${projectName}`}
                                                    className="h-[32px] w-[32px] "
                                                />
                                            )}

                                            <span className="ml-2 w-max min-w-[100px] overflow-hidden">
                                                {projectName}
                                            </span>
                                        </div>

                                        {counter.length >= 1 && (
                                            <span
                                                className={`absolute top-[50%] right-3 flex h-[16px] w-[16px] -translate-y-[50%] items-center justify-center rounded-full text-[10px]`}
                                            >
                                                {counter.length}
                                            </span>
                                        )}
                                    </a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div
                className={`w-full`}
                // className={`${
                //     toggledHeader ? 'ml-0 w-[32px]' : 'ml-[36px] w-full'
                // }  overflow-y-auto overflow-x-hidden duration-[250ms] ease-in`}
            >
                {session && (
                    <Link href="/profile">
                        <a
                            // className={`block w-max overflow-y-auto overflow-x-hidden ${
                            //     toggledHeader ? 'w-[48px]' : 'w-full'
                            // }`}
                            className={`flex max-h-[100%] flex-col ${
                                toggledHeader
                                    ? 'w-[48px] pl-0'
                                    : 'w-full pl-[0]'
                            } m-0 overflow-hidden duration-[250ms] ease-in`}
                        >
                            <div className="flex items-center ml-4">
                                <span className="h-[32px] w-[32px]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-[32px] w-[32px]"
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

                                <p className="ml-2 w-max min-w-[125px] overflow-hidden">
                                    Hi, {session?.user?.name}!
                                </p>
                            </div>
                        </a>
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Sidebar
