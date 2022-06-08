import { useState } from 'react'
import Select from 'react-select'
import Link from 'next/link'

import Card from '_components/blocks/Card'
import BarChart from '_components/blocks/BarChart'
import IssueBlock from '_components/common/IssueBlock'

const Overview = ({ projectData, notifications }) => {
    return (
        <>
            <ProjectSelection
                projectData={projectData}
                notifications={notifications}
            />
            <NotificationList notifications={notifications} />
            <Statistics />
        </>
    )
}

export default Overview

const ProjectSelection = ({ projectData, notifications }) => {
    const elementsCount = (data, selected) => {
        return data.filter((item) => {
            return item.name === selected
        }).length
    }

    return (
        <section className="py-4 desktop:col-start-1 desktop:col-end-3">
            <h2 className="mb-4 ml-1 text-xl font-medium">Your projects</h2>
            <ul className="flex justify-between w-full gap-2 pb-4 overflow-x-auto desktop:p-0">
                {projectData.map((project, i) => {
                    return (
                        <Card
                            tag="li"
                            key={i}
                            className={
                                'm-1 w-full rounded-xl bg-white px-4 pt-4 pb-2 shadow-sm  duration-75 ease-in hover:bg-slate-200'
                            }
                        >
                            <Link
                                href={`/projects/${project?.slug?.toLocaleLowerCase()}`}
                            >
                                <a className="flex flex-col justify-between ">
                                    <h3 className="flex items-center font-bold text-md ">
                                        <span className="w-5 mr-2">
                                            <img
                                                className="w-full"
                                                src={project.icon}
                                            />
                                        </span>
                                        {project.projectName}
                                    </h3>

                                    <div className="flex items-center justify-between pt-8">
                                        <p className="text-xs ">
                                            Current notifications:
                                        </p>
                                        <span className="p-2 text-xs rounded-md bg-brightGray">
                                            {elementsCount(
                                                notifications,
                                                project.slug.toLocaleLowerCase(),
                                            )}
                                        </span>
                                    </div>
                                </a>
                            </Link>
                        </Card>
                    )
                })}
            </ul>
        </section>
    )
}

const Statistics = ({}) => {
    const options = [
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
        { value: 'thisYear', label: 'This year' },
    ]

    const labelOptions = [
        { value: 'low', label: 'Low priority' },
        { value: 'medium', label: 'Medium priority' },
        { value: 'high', label: 'High priority' },
    ]

    return (
        <section className="flex flex-col gap-4 mr-1">
            <div>
                <h2 className="text-xl font-medium">Statistics</h2>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm shadow-slate-300">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold">
                        Detected issues overtime
                    </h3>
                    <div className="flex gap-2">
                        <Select
                            options={labelOptions}
                            value={labelOptions[2]}
                            className="text-xs"
                        />
                        <Select
                            options={options}
                            value={options[2]}
                            className="text-xs"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-start w-full">
                    <div className="flex items-center w-full gap-x-2">
                        <p className="w-4 text-xs -rotate-90">Issues</p>
                        <BarChart />
                    </div>
                    <p className="pt-4 text-xs">Months</p>
                </div>
            </div>
        </section>
    )
}

const NotificationList = ({ notifications }) => {
    const [openTab, setOpenTab] = useState(1)

    return (
        <section className="flex flex-col gap-4">
            <div>
                <h2 className="ml-1 text-xl font-medium ">Notifications</h2>
            </div>
            <div className="h-auto px-2 py-4 ml-1 duration-200 ease-in bg-white shadow-sm rounded-xl shadow-slate-300">
                <ul className="flex gap-4 mb-1 ml-1">
                    <li>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setOpenTab(1)
                            }}
                        >
                            <h3
                                className={
                                    'text-xs ' +
                                    (openTab === 1
                                        ? ' border-b-2 border-b-slate-800 font-bold text-slate-800'
                                        : '')
                                }
                            >
                                Reported
                            </h3>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setOpenTab(2)
                            }}
                        >
                            <h3
                                className={
                                    'text-xs ' +
                                    (openTab === 2
                                        ? ' border-b-2 border-b-slate-800 font-bold text-slate-800'
                                        : '')
                                }
                            >
                                In progress
                            </h3>
                        </button>
                    </li>
                </ul>

                <div className={openTab === 1 ? 'block' : 'hidden'}>
                    <IssueBlock
                        showTitle={false}
                        notificationType="projectImg"
                        issueTitle="Recent"
                        issueStatus="Reported"
                        emptyText="No notifications reported."
                        notifications={notifications}
                        background="bg-white border-2 shadow-transparent"
                    />
                </div>
                <div className={openTab === 2 ? 'block' : 'hidden'}>
                    <IssueBlock
                        showTitle={false}
                        notificationType="projectImg"
                        issueTitle="In Progress"
                        issueStatus="In progress"
                        emptyText="No notifications in progress yet."
                        notifications={notifications}
                        background="bg-white border-2 shadow-transparent"
                    />
                </div>
            </div>
        </section>
    )
}
