import Link from 'next/link'

const IntroName = ({ name }) => {
    return (
        <Link href="/">
            <a className={`mb-16 flex w-fit items-center justify-center`}>
                <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg">
                    <span className="flex flex-col items-center justify-center w-16 h-16 rounded-full ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 ml-2 fill-yellow-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                clipRule="evenodd"
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
