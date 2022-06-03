import { useState } from 'react'
import Select from 'react-select'
import Link from 'next/link'

import Card from '_components/blocks/Card'
import BarChart from '_components/blocks/BarChart'
import IssueBlock from '_components/common/IssueBlock'

const Overview = ({ projectData, notifications }) => {
    // console.log({ projectData, notifications })
    const a = projectData
    const b = notifications

    const getAmountOfProblems = (keyword) => {
        return projectData.filter((project) => {
            return notifications.filter((message) => {
                if (project.slug === keyword && project.slug === message.name)
                    console.log(message)
            })
        })
    }
    const abc = getAmountOfProblems('aubade')

    console.log(abc)

    // let result = b.filter((o1) => a.some((o2) => o1.service === o2.slug))

    // console.log(result)
    // var result = a.filter(function (v) {
    //     return (
    //         b.filter(function (v2) {
    //             return v.slug === v2.name && v.slug === keyword
    //         }).length > 0
    //     )
    // })

    // console.log(filterResult('mammut'))

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
            <h2 className="mb-4 text-xl font-medium">Your projects</h2>
            <ul className="flex justify-between w-full gap-4 pb-4 overflow-x-auto desktop:p-0">
                {projectData.map((project, i) => {
                    return (
                        <Card
                            tag="li"
                            key={i}
                            className={
                                'shadow-md w-full rounded-xl bg-offWhite  p-4 shadow-lg duration-75 ease-in hover:bg-flashWhite'
                            }
                        >
                            <Link
                                href={`/projects/${project?.slug?.toLocaleLowerCase()}`}
                            >
                                <a className="flex flex-col justify-between ">
                                    <h3 className="font-bold text-md ">
                                        {project.projectName}
                                    </h3>

                                    {/* <div className="flex items-center justify-between pt-8">
                                        <p className="text-xs ">
                                            Current notifications:
                                        </p>
                                        <span className="text-xs">
                                            {elementsCount(
                                                notifications,
                                                project.slug.toLocaleLowerCase(),
                                            )}
                                        </span>
                                    </div> */}

                                    <div className="flex items-center justify-between pt-8">
                                        <p className="text-xs ">
                                            Current notifications:
                                        </p>
                                        <span className="text-xs">
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

    return (
        <section className="flex flex-col gap-4">
            <div>
                <h2 className="text-xl font-medium">Statistics</h2>
            </div>
            <div className="p-4 mt-10 rounded-lg shadow-lg bg-offWhite">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold ">Detected issues overtime</h3>
                    <Select options={options} value={'month'} />
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
                <h2 className="text-xl font-medium">Notifications</h2>
            </div>
            <div>
                <ul className="flex gap-4 mb-4">
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
                                        ? ' border-b-2 font-bold'
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
                                        ? ' border-b-2 font-bold'
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
                    />
                </div>
            </div>
        </section>
    )
}
