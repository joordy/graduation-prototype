import React from 'react'

import { useToggleHeader } from '_utils/atoms/toggleHeader'

import Breadcrumbs from '_components/blocks/Breadcrumbs'
import TopNavigation from '_components/common/navigation/TopNavigation'
import { NOTIFICATION_DATA } from '_utils/database/dataset'

export default function Page({ topNav = false, breadCrumbs = true, children }) {
    const toggledHeader = useToggleHeader()

    return (
        <>
            <main
                className={` w-full   ${
                    toggledHeader
                        ? 'close overflow-hidden tablet:ml-[0]'
                        : 'open overflow-auto tablet:ml-[0]'
                } h-screen tablet:top-0 tablet:bottom-0 tablet:right-0  ${
                    topNav ? '' : 'mt-12'
                }  tablet:p-8 tablet:pl-12`}
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
