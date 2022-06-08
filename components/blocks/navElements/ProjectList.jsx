import Link from 'next/link'

const ProjectList = ({
    toggledHeader,
    projectData,
    elementsCount,
    getNotifications,
    query,
}) => {
    return (
        <ul
            className={`flex max-h-[100%] flex-col gap-4 ${
                toggledHeader ? 'w-[48px] pl-0' : 'w-full pl-[0]'
            } overflow-y-auto overflow-x-hidden duration-[250ms] ease-in`}
        >
            {projectData.map(({ icon, projectName, slug }, i) => {
                const activePath = query.project === slug

                const counter = elementsCount(getNotifications, slug)

                return (
                    <li
                        key={i}
                        className={
                            `relative flex w-['inherit'] rounded-lg p-2 text-sm duration-100 ease-in hover:cursor-pointer hover:bg-brightGray ` +
                            (activePath && 'bg-brightGray')
                        }
                    >
                        <Link href={`/projects/${slug}`}>
                            <a>
                                <div className={`flex flex-row items-center`}>
                                    {icon && (
                                        <img
                                            src={icon}
                                            alt={`icon of ${projectName}`}
                                            className="w-6 h-6 m-1"
                                        />
                                    )}

                                    <span className="ml-2 w-max min-w-[100px] overflow-hidden">
                                        {projectName}
                                    </span>
                                </div>

                                {counter.length >= 1 && (
                                    <span
                                        className={`${
                                            toggledHeader
                                                ? 'delay-50 opacity-0'
                                                : 'opacity-100 delay-200'
                                        } absolute top-[50%] right-3 flex  h-5 w-5 -translate-y-[50%] items-center justify-center rounded-md bg-brightGray text-[10px] shadow-lg duration-150 ease-in`}
                                    >
                                        {counter.length}
                                    </span>
                                )}
                            </a>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default ProjectList
