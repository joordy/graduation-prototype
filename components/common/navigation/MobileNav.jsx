import { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useUserData } from '_utils/atoms/userData'
import { useNotifications } from '_utils/atoms/notifications'
import { useToggleHeader, useSetToggleHeader } from '_utils/atoms/toggleHeader'
import { useAuth } from '_utils/context/auth'
import { PROJECT_DATA } from '_utils/database/dataset'

import User from '_components/blocks/icons/User'
import Home from '_components/blocks/icons/Home'
import Collection from '_components/blocks/icons/Collection'

const MobileNav = ({}) => {
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
                'desktop:hidden ' + 'fixed bottom-4 rounded-lg bg-white p-4'
            }
        >
            <nav>
                <ul className={'flex justify-between gap-x-16'}>
                    <li>
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
                    <li>
                        <Link href="/">
                            <div
                                className={
                                    'flex flex-col items-center justify-center '
                                }
                            >
                                <Collection />
                                <p className={'text-[0.675rem]'}>Projects</p>
                            </div>
                        </Link>
                    </li>
                    <li>
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
        </header>
    )
}

export default MobileNav
