import { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { PROJECT_DATA } from '_utils/database/dataset'
import { useAuth } from '_utils/context/auth'

import { useToggleHeader, useSetToggleHeader } from '_utils/atoms/toggleHeader'
import { useUserData } from '_utils/atoms/userData'

const Sidebar = ({ notificationCounter, ...props }) => {
    const { user } = useAuth()
    console.log('sidebar user', user?.user_metadata?.projects)
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
            // console.log(
            //     user?.user_metadata?.projects?.indexOf(projects.projectName),
            // )
            // return user?.user_metadata?.projects?.indexOf(projects.projectName)
        })
    }, [PROJECT_DATA, user, userData])

    return (
        <nav
            className={`z-100 fixed flex w-5/6 flex-col items-center justify-between overflow-y-auto bg-[#F1F3F4] px-8  py-16 shadow-[0_0_30px_-15px_rgba(0,0,0,0.3)] duration-[250ms] ease-in md:relative md:left-0 md:h-screen md:px-4 md:pt-8 md:pb-16 ${
                toggledHeader ? 'md:w-[80px]' : 'md:w-[300px]'
            } fixed -left-[100vw] top-0 bottom-0 md:overflow-visible ${
                toggledHeader && 'left-[0]'
            }`}
        >
            <CollapseButton onClick={toggle} toggledHeader={toggledHeader} />

            <div className="w-full overflow-hidden">
                <ProjectName name="Loggly" toggledHeader={toggledHeader} />

                {/* <p className="mt-4 mb-2 text-xs text-grey-500">Your projects</p> */}

                <ProjectList
                    toggledHeader={toggledHeader}
                    projectData={projectData}
                    elementsCount={elementsCount}
                    notificationCounter={notificationCounter}
                />
            </div>

            <div className={`w-full`}>
                {userData && (
                    <UserProfile
                        userData={userData}
                        toggledHeader={toggledHeader}
                    />
                )}
            </div>
        </nav>
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
                <span className="mx-2 h-[32px] w-[32px] rounded-full bg-grey-900"></span>
                <h1 className="ml-6 text-3xl font-extrabold">{name}</h1>
            </a>
        </Link>
    )
}

const UserProfile = ({ userData, toggledHeader }) => {
    return (
        <Link href="/profile">
            <a
                className={`flex max-h-[100%] flex-col ${
                    toggledHeader ? 'w-[48px] pl-0' : 'w-full pl-[0]'
                } m-0 overflow-hidden duration-[250ms] ease-in`}
            >
                <div className="flex items-center ml-2">
                    <span className="h-[32px] w-[32px] rounded-full bg-grey-200 p-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            // className="h-[32px] w-[32px]"
                            className="w-full h-full"
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

                    <div>
                        <p className="ml-2 w-max min-w-[125px] overflow-hidden">
                            {userData.firstName}
                        </p>
                        <p className="ml-2 w-max min-w-[125px] overflow-hidden text-xs">
                            {userData.email}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default Sidebar
