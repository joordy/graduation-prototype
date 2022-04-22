import React from 'react'

import { useToggleHeader } from '_utils/atoms/toggleHeader'

import Breadcrumbs from '_components/blocks/Breadcrumbs'
import TopNavigation from '_components/scopes/TopNavigation'
import { NOTIFICATION_DATA } from '_utils/database/dataset'

export default function Page({ topNav = false, breadCrumbs = true, children }) {
    const toggledHeader = useToggleHeader()

    return (
        <>
            <main
                className={` w-full   ${
                    toggledHeader
                        ? 'close overflow-hidden'
                        : 'open overflow-auto'
                } h-screen md:top-0 md:bottom-0 md:right-0  ${
                    toggledHeader ? 'md:ml-[0]' : 'md:ml-[0]'
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
