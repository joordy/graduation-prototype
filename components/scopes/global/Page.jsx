import React from 'react'

import { useToggleHeader } from '_utils/atoms/toggleHeader'

import Breadcrumbs from '_components/blocks/Breadcrumbs'
import TopNavigation from '_components/scopes/navigation/TopNavigation'
import { NOTIFICATION_DATA } from '_utils/database/dataset'

export default function Page({ topNav = false, breadCrumbs = true, children }) {
    const toggledHeader = useToggleHeader()

    return (
        <>
            <main
                className={` w-full   ${
                    toggledHeader
                        ? 'close overflow-hidden md:ml-[0]'
                        : 'open overflow-auto md:ml-[0]'
                } h-screen md:top-0 md:bottom-0 md:right-0  ${
                    topNav ? '' : 'mt-12'
                }  md:p-8 md:pl-12`}
            >
                {topNav && (
                    <TopNavigation
                        notificationCounter={NOTIFICATION_DATA.length}
                        breadCrumbs={breadCrumbs}
                    />
                )}

                {children}
            </main>
        </>
    )
}
