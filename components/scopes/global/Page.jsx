import React from 'react'

import { useToggleHeader } from '_utils/atoms/toggleHeader'

import TopNavigation from '_components/common/navigation/TopNavigation'
import { NOTIFICATION_DATA } from '_utils/database/dataset'

export default function Page({ topNav = false, breadCrumbs = true, children }) {
    const toggledHeader = useToggleHeader()

    return (
        <>
            <main
                className={
                    'h-screen w-full p-4 tablet:top-0 desktop:bottom-0 desktop:right-0 desktop:p-8 desktop:pl-12 ' +
                    (toggledHeader
                        ? 'close overflow-hidden desktop:ml-[0]'
                        : 'open overflow-auto desktop:ml-[0]') +
                    (topNav ? '' : 'mt-12')
                }
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
