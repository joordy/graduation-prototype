import Link from 'next/link'

const IntroName = ({ name }) => {
    return (
        <Link href="/">
            <a className={`mb-16 flex w-fit items-center justify-center`}>
                <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg">
                    <span className="flex flex-col items-center justify-center w-16 h-16 rounded-full ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 mb-1 ml-4 rotate-45"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </span>
                </div>
                <h1 className="ml-4 text-3xl font-extrabold">{name}</h1>
            </a>
        </Link>
    )
}

export default IntroName
