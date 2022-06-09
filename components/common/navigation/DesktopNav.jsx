import { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useUserData } from '_utils/atoms/userData'
import { useNotifications } from '_utils/atoms/notifications'
import { useToggleHeader, useSetToggleHeader } from '_utils/atoms/toggleHeader'
import { useAuth } from '_utils/context/auth'
import { PROJECT_DATA } from '_utils/database/dataset'

import CollapseButton from '_components/blocks/navElements/CollapseButton'
import ProfileButton from '_components/blocks/navElements/ProfileButton'
import ProjectList from '_components/blocks/navElements/ProjectList'
import IntroName from '_components/blocks/navElements/IntroName'
import NotificationCenter from '_components/blocks/navElements/NotificationCenter'
import Plus from '_components/blocks/icons/Plus'

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
            return item.name === selected && item.status !== 'Solved'
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
                'z-100 relative top-0 bottom-0 left-0  hidden h-screen flex-col items-center justify-between overflow-visible border-r bg-white px-4 pt-8 pb-16 shadow-[0_0_30px_-15px_rgba(0,0,0,0.3)] duration-[250ms] ease-in desktop:flex ' +
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
                    <IntroName name="Quickly" toggledHeader={toggledHeader} />

                    <ProjectList
                        toggledHeader={toggledHeader}
                        projectData={projects}
                        elementsCount={elementsCount}
                        getNotifications={getNotifications}
                        query={query}
                    />

                    {user?.user_metadata?.role !== 'Technical Director' && (
                        <hr className="mx-2 border-grey-100" />
                    )}

                    {user?.user_metadata?.role == 'Technical Director' && (
                        <>
                            <button className="m-0 flex max-h-[100%] w-full items-center overflow-hidden rounded-lg pl-[0] duration-[250ms] ease-in hover:cursor-pointer hover:bg-slate-200">
                                <div className="relative flex flex-row items-center w-full p-2 text-sm rounded-lg false">
                                    <span className="flex flex-col items-center justify-center w-6 h-6 p-1 m-1 rounded-full stroke-grey-800 ">
                                        <Plus />
                                    </span>
                                    <p className="ml-2 w-max min-w-[125px] overflow-hidden text-left text-sm">
                                        Add project
                                    </p>
                                </div>
                            </button>
                            <hr className="mx-2 border-grey-100" />
                        </>
                    )}

                    <NotificationCenter
                        query={pathname === '/notifications'}
                        toggledHeader={toggledHeader}
                        getNotifications={getNotifications}
                    />
                </div>

                <div className="flex max-h-[100%] w-full flex-col gap-4  overflow-x-hidden pl-[0] duration-[250ms] ease-in">
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

export default DesktopNav
