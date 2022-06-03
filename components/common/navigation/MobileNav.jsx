import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useUserData } from '_utils/atoms/userData'
import { useNotifications } from '_utils/atoms/notifications'
import { useToggleHeader } from '_utils/atoms/toggleHeader'
import { useAuth } from '_utils/context/auth'
import { PROJECT_DATA } from '_utils/database/dataset'

import User from '_components/blocks/icons/User'
import Home from '_components/blocks/icons/Home'
import Collection from '_components/blocks/icons/Collection'
import ProjectList from '_components/blocks/navElements/ProjectList'

const MobileNav = ({}) => {
    const [toggleWrapper, setToggleWrapper] = useState(false)
    const { user } = useAuth()
    const { query, pathname } = useRouter()
    const userData = useUserData()
    const toggledHeader = useToggleHeader()
    const getNotifications = useNotifications()

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

    const handleClick = useCallback(() => {
        console.log('toggleHeihgt', toggleWrapper)
        setToggleWrapper(!toggleWrapper)
    }, [toggleWrapper])

    return (
        <header
            className={
                'fixed bottom-4 z-10 rounded-lg bg-white py-4 px-8 shadow-lg desktop:hidden'
            }
        >
            <nav className="relative z-100">
                <ul className={'flex justify-between gap-x-16'}>
                    <li className="flex flex-col items-center justify-center w-8">
                        <Link href="/">
                            <div
                                className={
                                    'flex flex-col items-center justify-center '
                                }
                            >
                                <Home />
                                <p className={'text-[0.675rem]'}>Overview</p>
                            </div>
                        </Link>
                    </li>
                    <li className="flex flex-col items-center justify-center w-8">
                        <button onClick={handleClick}>
                            <Link href="#">
                                <div
                                    className={
                                        'flex flex-col items-center justify-center '
                                    }
                                >
                                    <Collection />
                                    <p className={'text-[0.675rem]'}>
                                        Projects
                                    </p>
                                </div>
                            </Link>
                        </button>
                    </li>
                    <li className="flex flex-col items-center justify-center w-8">
                        <Link href="/profile">
                            <div
                                className={
                                    'flex flex-col items-center justify-center '
                                }
                            >
                                <User />
                                <p className={'text-[0.675rem]'}>Profile</p>
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div
                className={
                    'absolute left-[50%] w-[225px] -translate-x-[50%] rounded-lg bg-offWhite px-4 py-2 shadow-lg duration-200  ease-in ' +
                    (toggleWrapper
                        ? 'visible bottom-[5rem] h-auto'
                        : 'invisible bottom-2 h-[20px]')
                }
            >
                <ProjectList
                    toggledHeader={toggledHeader}
                    projectData={projects}
                    elementsCount={elementsCount}
                    getNotifications={getNotifications}
                    query={query}
                />
            </div>
        </header>
    )
}

export default MobileNav
