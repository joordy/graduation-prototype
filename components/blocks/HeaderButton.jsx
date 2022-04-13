import Link from 'next/link'

const HeaderButton = ({ children, href = '', right = '', onClick }) => {
    return (
        <button
            className={`ml-[8px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white shadow-lg shadow-grey-100/50`}
            onClick={onClick}
        >
            <Link href={href}>
                <a>{children}</a>
            </Link>
        </button>
    )
}

export default HeaderButton
