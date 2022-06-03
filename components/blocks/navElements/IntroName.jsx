import Link from 'next/link'

const IntroName = ({ name }) => {
    return (
        <Link href="/">
            <a className={`mb-16 flex w-fit items-center justify-center`}>
                <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg">
                    <span className="flex h-[32px] w-[32px] flex-col items-center justify-center rounded-full ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </span>
                </div>
                <h1 className="ml-4 text-3xl font-extrabold">{name}</h1>
            </a>
        </Link>
    )
}

export default IntroName
