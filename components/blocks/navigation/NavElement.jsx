import Link from 'next/link'

import { useToggleHeader } from '_utils/atoms/toggleHeader'

const NavElement = ({ name, icon, slug }) => {
    const toggledHeader = useToggleHeader()

    return (
        <Link href={slug}>
            <a className="flex flex-row items-center">
                {icon && (
                    <img
                        src={icon}
                        alt={`icon of ${name}`}
                        className="h-[32px] w-[32px]"
                    />
                )}
                {!toggledHeader && <span className="ml-2 ">{name}</span>}
            </a>
        </Link>
    )
}

export default NavElement
