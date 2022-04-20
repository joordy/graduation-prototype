import Link from 'next/link'

import { useToggleHeader } from '_utils/atoms/toggleHeader'

const NavElement = ({ name, icon, slug }) => {
    const toggledHeader = useToggleHeader()

    return (
        <Link href={slug}>
            <a className="flex flex-row items-center">
                {icon && (
                    <div
                        className={`h-[32px] w-[32px] rounded-lg bg-grey-900`}
                    ></div>
                    // <img
                    //     src={icon}
                    //     alt={`icon of ${name}`}
                    //     className="h-[32px] w-[32px] "
                    // />
                )}

                <span className="ml-2">{name}</span>
                {/* {!toggledHeader &&
                // }  */}
            </a>
        </Link>
    )
}

export default NavElement
