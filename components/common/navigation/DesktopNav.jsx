import { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useUserData } from '_utils/atoms/userData'
import { useNotifications } from '_utils/atoms/notifications'
import { useToggleHeader, useSetToggleHeader } from '_utils/atoms/toggleHeader'
import { useAuth } from '_utils/context/auth'
import { PROJECT_DATA } from '_utils/database/dataset'

import Alert from '_components/blocks/icons/Alert'
import CollapseButton from '_components/blocks/CollapseButton'
import ProfileButton from '_components/blocks/ProfileButton'
import ProjectList from '_components/blocks/ProjectList'

const DesktopNav = ({}) => {
    const { user } = useAuth()
    const { query, pathname } = useRouter()
    const userData = useUserData()
    const toggledHeader = useToggleHeader()
    const getNotifications = useNotifications()

    const setToggledHeader = useSetToggleHeader()

    const toggle = () => {
        setToggledHeader(!toggledHeader)
    }

    const elementsCount = (data, selected) => {
        return data.filter((item) => {
            return item.name === selected
        })
    }

    const projects = useMemo(() => {
        return PROJECT_DATA.filter((projects) => {
            return (
                user?.user_metadata?.projects?.indexOf(
                    projects?.projectName,
                ) !== -1
            )
        })
    }, [PROJECT_DATA, user?.user_metadata?.projects, userData])

    return (
        <header
            className={
                'z-100 relative top-0 bottom-0 left-0  hidden h-screen flex-col items-center justify-between overflow-visible bg-offWhite px-4 pt-8 pb-16 shadow-[0_0_30px_-15px_rgba(0,0,0,0.3)] duration-[250ms] ease-in desktop:flex ' +
                (toggledHeader ? ' tablet:w-[80px]' : ' tablet:w-[300px]')
            }
        >
            <CollapseButton onClick={toggle} toggledHeader={toggledHeader} />

            <nav
                className={
                    'flex h-full w-full flex-col justify-between overflow-hidden p-0 '
                }
            >
                <div className="flex flex-col gap-y-4">
                    <ProjectName name="Quickly" toggledHeader={toggledHeader} />
                    <ProjectList
                        toggledHeader={toggledHeader}
                        projectData={projects}
                        elementsCount={elementsCount}
                        getNotifications={getNotifications}
                        query={query}
                    />

                    <hr className="mx-2 border-grey-100" />

                    <NotificationCenter
                        query={pathname === '/notifications'}
                        toggledHeader={toggledHeader}
                        elementsCount={getNotifications.length}
                    />
                </div>

                <div className="flex max-h-[100%] w-full flex-col gap-4 overflow-y-auto overflow-x-hidden pl-[0] duration-[250ms] ease-in">
                    {userData && (
                        <ProfileButton
                            user={user}
                            userData={userData}
                            toggledHeader={toggledHeader}
                        />
                    )}
                </div>
            </nav>
        </header>
    )
}

const ProjectName = ({ name }) => {
    return (
        <Link href="/">
            <a className={`mb-16 flex w-fit items-center justify-center`}>
                <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg">
                    <span className="flex h-[32px] w-[32px] flex-col items-center justify-center rounded-full ">
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
                </div>
                <h1 className="ml-4 text-3xl font-extrabold">{name}</h1>
            </a>
        </Link>
    )
}

const NotificationCenter = ({ query, toggledHeader, elementsCount }) => {
    return (
        <Link href="/notifications">
            <a
                className={`m-0 flex max-h-[100%] items-center overflow-hidden rounded-lg ${
                    toggledHeader ? 'w-[48px] pl-0' : 'w-full pl-[0]'
                } duration-[250ms] ease-in hover:cursor-pointer hover:bg-brightGray`}
            >
                <div
                    className={`relative flex w-full flex-row  items-center rounded-lg  p-2 text-sm  ${
                        query && 'bg-brightGray'
                    }`}
                >
                    <span className="flex flex-col items-center justify-center w-6 h-6 p-1 m-1 rounded-full stroke-grey-800 ">
                        <Alert />
                    </span>
                    <p className="ml-2 w-max min-w-[125px] overflow-hidden text-sm">
                        Notification center
                    </p>
                    {elementsCount >= 1 && (
                        <span
                            className={`${
                                toggledHeader
                                    ? 'delay-50 opacity-0'
                                    : 'opacity-100 delay-200'
                            } absolute top-[50%] right-3 flex  h-5 w-5 -translate-y-[50%] items-center justify-center rounded-md bg-brightGray text-[10px] duration-150 ease-in `}
                        >
                            {elementsCount}
                        </span>
                    )}
                </div>
            </a>
        </Link>
    )
}

export default DesktopNav
