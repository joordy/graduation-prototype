const CollapseButton = ({ onClick, toggledHeader }) => {
    return (
        <button
            onClick={onClick}
            className="absolute top-8 right-[-1.5rem]  z-10 h-[2rem] w-[1.5rem] border bg-white shadow-[0_0_30px_-15px_rgba(0,0,0,0.3)] duration-200 ease-in hover:bg-slate-200 tablet:rounded-r-lg"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="block w-6 h-6 tablet:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`hidden h-6 w-6 duration-150 tablet:block ${
                    toggledHeader ? 'tablet:rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                />
            </svg>
        </button>
    )
}

export default CollapseButton
