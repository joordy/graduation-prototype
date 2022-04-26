import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import {
    convertBreadcrumb,
    capitalizeFirstLetter,
} from 'utils/helpers/stringHelpers'

const Breadcrumbs = () => {
    const { asPath } = useRouter()
    const [breadcrumbs, setBreadcrumbs] = useState(null)

    useEffect(() => {
        if (asPath) {
            const trimmedPath = asPath.slice(0, asPath.length - 1)
            const linkPath = trimmedPath.split('/')

            linkPath.shift()

            const pathArray = linkPath.map((path, i) => {
                const pathName = capitalizeFirstLetter(path)
                return {
                    breadcrumb: pathName,
                    href: '/' + linkPath.slice(0, i + 1).join('/'),
                }
            })

            setBreadcrumbs(pathArray)
        }
    }, [asPath])

    if (!breadcrumbs) {
        return null
    }

    return (
        <nav aria-label="breadcrumbs" className="text-[13px] font-light ">
            <ol className="flex">
                <li>
                    <a href="/">Overview</a>
                </li>
                {breadcrumbs.map((breadcrumb, i) => {
                    return (
                        <li key={breadcrumb.href} className="ml-1">
                            <Link href={breadcrumb.href}>
                                <a>
                                    / {convertBreadcrumb(breadcrumb.breadcrumb)}
                                </a>
                            </Link>
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

export default Breadcrumbs
