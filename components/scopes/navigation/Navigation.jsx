import { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { PROJECT_DATA } from '_utils/database/dataset'
import { useAuth } from '_utils/context/auth'

import { useToggleHeader, useSetToggleHeader } from '_utils/atoms/toggleHeader'
import { useUserData } from '_utils/atoms/userData'

const Sidebar = ({ notificationCounter, ...props }) => {
    const { user } = useAuth()
    const userData = useUserData()
    const toggledHeader = useToggleHeader()

    const setToggledHeader = useSetToggleHeader()

    const toggle = () => {
        setToggledHeader(!toggledHeader)
    }

    const elementsCount = (data, selected) => {
        return data.filter((item) => {
            return item.projectName === selected
        })
    }

    const projectData = useMemo(() => {
        return PROJECT_DATA.filter((projects) => {
            return userData?.projects?.indexOf(projects.projectName) > -1
            // return user?.user_metadata?.projects?.indexOf(projects.projectName)
        })
    }, [PROJECT_DATA, user, userData])

    return (
        <aside
            className={`z-100 fixed -left-[100vw] top-0 bottom-0  w-5/6   overflow-y-auto bg-[#F1F3F4] shadow-2xl duration-[250ms] ease-in md:relative md:left-0  md:h-screen md:overflow-visible  ${
                toggledHeader ? 'left-[0] md:w-[80px]' : 'md:w-[300px]'
            }`}
        >
            <CollapseButton onClick={toggle} toggledHeader={toggledHeader} />

            <nav className="flex flex-col justify-between w-full h-full px-8 py-16 overflow-hidden md:px-4 md:pt-8 md:pb-8">
                <div className="">
                    <ProjectName name="Loggly" toggledHeader={toggledHeader} />
                    <hr className="mx-2 mb-4 border-grey-300" />
                    <ProjectList
                        toggledHeader={toggledHeader}
                        projectData={projectData}
                        elementsCount={elementsCount}
                        notificationCounter={notificationCounter}
                    />
                </div>

                <div className="w-full overflow-hidden">
                    <hr className="mx-2 my-4 border-grey-300" />

                    <Link href="/">
                        <a
                            className={`m-0 mb-4 ml-2 flex max-h-[100%] items-center overflow-hidden ${
                                toggledHeader
                                    ? 'w-[48px] pl-0'
                                    : 'w-full pl-[0]'
                            } duration-[250ms] ease-in`}
                        >
                            <span className="flex h-[32px] w-[32px] flex-col items-center justify-center rounded-full  stroke-grey-800 p-1 ">
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
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </span>
                            <p className="ml-2 w-max min-w-[125px] overflow-hidden text-sm">
                                Notification Center
                            </p>
                        </a>
                    </Link>

                    <hr className="mx-2 my-4 border-grey-300" />

                    {userData && (
                        <UserProfile
                            userData={userData}
                            toggledHeader={toggledHeader}
                        />
                    )}
                </div>

                {/* <CollapseButton onClick={toggle} toggledHeader={toggledHeader} />
            <div className={`w-full`}>
                <Link href="/">
                    <a
                        className="${ toggledHeader ? 'w-[48px] pl-0' : 'w-full
                    pl-[0]' } m-0 ml-2 flex flex max-h-[100%]
                 items-center overflow-hidden duration-[250ms] ease-in"
                    >
                        <span className="flex h-[32px] w-[32px] flex-col items-center justify-center rounded-full  stroke-grey-800 p-1 ">
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
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                        </span>
                        <p className="ml-2 w-max min-w-[125px] overflow-hidden">
                            Notification Center
                        </p>
                    </a>
                </Link>

                {userData && (
                    <UserProfile
                        userData={userData}
                        toggledHeader={toggledHeader}
                    />
                )}
            </div> */}
            </nav>
        </aside>
    )
}

const CollapseButton = ({ onClick, toggledHeader }) => {
    return (
        <button
            onClick={onClick}
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
    )
}

const ProjectList = ({
    toggledHeader,
    projectData,
    elementsCount,
    notificationCounter,
}) => {
    const { query } = useRouter()

    return (
        <ul
            className={`flex max-h-[100%] flex-col gap-4 ${
                toggledHeader ? 'w-[48px] pl-0' : 'w-full pl-[0]'
            } overflow-y-auto overflow-x-hidden duration-[250ms] ease-in`}
        >
            {projectData.map(({ icon, projectName, slug }, i) => {
                const activePath = query.project === slug

                const counter = elementsCount(notificationCounter, projectName)

                return (
                    <li
                        key={i}
                        className={`relative flex w-['inherit'] rounded-lg p-2 text-sm ${
                            activePath && 'bg-white font-[700]'
                        }`}
                    >
                        <Link href={`/projects/${slug}`}>
                            <a>
                                <div className={`flex flex-row items-center`}>
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
    )
}

const ProjectName = ({ name }) => {
    return (
        <Link href="/">
            <a className={`mb-16 flex w-fit items-center justify-center`}>
                <span className="mx-2 flex h-[32px] w-[32px] flex-col items-center justify-center rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </span>
                <h1 className="ml-6 text-3xl font-extrabold">{name}</h1>
            </a>
        </Link>
    )
}

const UserProfile = ({ userData, toggledHeader }) => {
    console.log(userData)
    return (
        <Link href="/profile">
            <a
                className={`flex max-h-[100%] flex-col ${
                    toggledHeader ? 'w-[48px]' : 'w-full'
                } m-0 overflow-hidden duration-[250ms] ease-in`}
            >
                <div className="flex items-center ml-2">
                    <span className="flex h-[32px] w-[32px] flex-col items-center justify-center rounded-full bg-grey-900 stroke-grey-800 p-1 text-white ">
                        {userData?.firstName?.charAt(0)}
                        {userData?.lastName?.charAt(0)}
                    </span>

                    <div>
                        <p className="ml-2 w-max min-w-[125px] overflow-hidden">
                            {userData?.firstName}
                        </p>
                        <p className="ml-2 w-max min-w-[125px] overflow-hidden text-xs text-grey-700">
                            {userData?.user_role?.charAt(0).toUpperCase() +
                                userData?.user_role?.slice(1)}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default Sidebar
