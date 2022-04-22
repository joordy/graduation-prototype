import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { PROJECT_DATA } from '_utils/database/dataset'

import { useToggleHeader, useSetToggleHeader } from '_utils/atoms/toggleHeader'

import NavElement from '_components/blocks/NavElement'

const Sidebar = ({ userData, notificationCounter, projectData, ...props }) => {
    const { query } = useRouter()
    const navigationRef = useRef()

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
        console.log(navigationRef.current?.getBoundingClientRect())
        setNavWidth(navigationRef.current?.getBoundingClientRect().width)
    }, [navigationRef?.current?.getBoundingClientRect().width])

    console.log(navWidth)
    return (
        <nav
            className={`z-100 md-py-16 fixed flex w-5/6 flex-col items-center justify-between overflow-y-auto rounded-r-2xl bg-white px-8 py-16 shadow-[0_0_40px_-15px_rgba(0,0,0,0.3)] duration-[250ms] ease-in md:relative md:left-0 md:h-screen md:px-4 ${
                toggledHeader ? 'md:w-[100px]' : 'md:w-[300px]'
            } fixed -left-[100vw] top-0 bottom-0 md:overflow-visible ${
                toggledHeader && 'left-[0]'
            }`}
        >
            <button
                onClick={toggle}
                className="absolute left-4 top-8 z-10 md:right-[-2rem] md:left-[unset] md:h-[2rem] md:w-[2rem] md:bg-white"
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
                    className="hidden w-6 h-6 md:block"
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

            <Link href="/">
                <a className="flex font-extrabold">404</a>
            </Link>

            <ul
                ref={navigationRef}
                className={`block max-h-[75%] ${
                    toggledHeader ? 'w-[32px] pl-0' : 'w-full pl-[36px]'
                } overflow-y-auto overflow-x-hidden duration-[250ms] ease-in`}
            >
                {PROJECT_DATA.map(({ icon, projectName, slug }, i) => {
                    const activePath = query.slug === slug

                    const counter = elementsCount(
                        notificationCounter,
                        projectName,
                    )

                    return (
                        <li
                            key={i}
                            className={`relative flex w-max py-4  text-sm  font-medium `}
                        >
                            <div
                                className={`static z-10 flex ${
                                    activePath
                                        ? `after:absolute after:left-[-10px] after:top-[16.25%] after:bottom-[16.25%]  after:z-[-1] after:h-[67.5%] after:w-[10px] after:rounded-lg after:bg-grey-100/50 after:p-1 after:content-['']`
                                        : ''
                                }`}
                            >
                                <NavElement
                                    name={projectName}
                                    slug={`/projects/${slug}`}
                                    icon={icon}
                                />
                            </div>
                            {counter.length >= 1 && (
                                <span
                                    className={`absolute top-[50%] -right-7 flex h-[16px] w-[16px] -translate-y-[50%] items-center justify-center rounded-full bg-[#d1261a] text-[8px] text-white`}
                                >
                                    {counter.length}
                                </span>
                            )}
                        </li>
                    )
                })}
            </ul>

            <div
                className={`${
                    toggledHeader ? 'ml-0 w-[32px]' : 'ml-[36px] w-full'
                }  overflow-y-auto overflow-x-hidden duration-[250ms] ease-in`}
            >
                {userData && (
                    <Link href="/profile">
                        <a className={`block w-max `}>
                            <div className="flex items-center justify-center">
                                <span>
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

                                <p className="ml-2">
                                    Hi, {userData.user_metadata.name}!
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
