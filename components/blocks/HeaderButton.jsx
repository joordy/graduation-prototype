import Link from 'next/link'

const HeaderButton = ({ children, href = '', right = '', onClick }) => {
    return (
        <button
            className={`ml-[8px] flex h-[32px] w-[32px] items-center justify-center rounded-full border bg-white`}
            onClick={onClick}
        >
            <Link href={href}>
                <a>{children}</a>
            </Link>
        </button>
    )
}

export default HeaderButton
