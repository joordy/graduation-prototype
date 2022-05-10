import Link from 'next/link'

const Popup = ({ projectName, pathName, intro, icon, ...props }) => {
    return (
        <Link href={`/${pathName}`}>
            <a>
                <div className="flex text-grey-900">
                    <div className="mr-4 flex h-[32px] w-[32px] items-center justify-center rounded-lg bg-grey-900">
                        {/* <img src={icon} alt={`Error on ${projectName}`} /> */}
                    </div>
                    <div className="flex flex-col">
                        <h1 className="mb-2 text-2xl font-bold">
                            {projectName}
                        </h1>
                        <p>{intro}</p>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default Popup
