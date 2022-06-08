import { useState } from 'react'
import Select from 'react-select'

import { getValueInArrayCounter } from '_utils/helpers/arrayHelpers'

import IssueBlock from '_components/common/IssueBlock'

const Board = ({ notifications }) => {
    const [selectedValue, setSelectedValue] = useState(null)

    const handleChange = (e) => {
        setSelectedValue(e.value)
    }

    const filterOptions = [
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
        { value: 'all', label: 'All' },
    ]

    return (
        <section className="flex flex-col gap-2">
            <aside className="flex items-center justify-between gap-4 ">
                <h2 className="text-xl font-bold">Notifications</h2>

                <form className="flex items-center">
                    <label className="mr-2 text-xs font-medium">Sort by:</label>
                    <Select
                        options={filterOptions}
                        value={
                            selectedValue
                                ? filterOptions.find(
                                      (obj) => obj.value === selectedValue,
                                  )
                                : filterOptions[2]
                        }
                        onChange={handleChange}
                        className="w-32 text-xs"
                    />
                </form>
            </aside>

            <div className="flex h-[calc(100%-0.5em)] justify-between gap-8">
                <section className="h-[inherit] w-full overflow-hidden rounded-lg bg-white p-4 shadow-sm shadow-slate-300">
                    <div className="border-b-2">
                        <h2 className="mb-2 ml-1 font-[500]">
                            Reported
                            {getValueInArrayCounter(
                                notifications,
                                'status',
                                'Reported',
                            ) >= 1 && (
                                <span className="text-sm">{` (${getValueInArrayCounter(
                                    notifications,
                                    'status',
                                    'Reported',
                                )}):`}</span>
                            )}
                        </h2>
                    </div>

                    <IssueBlock
                        showTitle={true}
                        issueTitle="Recent"
                        issueStatus="Reported"
                        emptyText="No notifications reported."
                        notifications={notifications}
                        background="bg-white border-2 shadow-transparent mx-0"
                        innerWrapper="pb-8"
                    />
                </section>

                <section className="h-[inherit] w-full overflow-hidden rounded-lg bg-white p-4 shadow-sm shadow-slate-300">
                    <div className="border-b-2">
                        <h2 className="mb-2 ml-1 font-[500]">
                            In Progress
                            {getValueInArrayCounter(
                                notifications,
                                'status',
                                'In progress',
                            ) >= 1 && (
                                <span className="text-sm">{` (${getValueInArrayCounter(
                                    notifications,
                                    'status',
                                    'In progress',
                                )}):`}</span>
                            )}
                        </h2>
                    </div>

                    <IssueBlock
                        showTitle={true}
                        issueTitle="In Progress"
                        issueStatus="In progress"
                        emptyText="No notifications in progress yet."
                        notifications={notifications}
                        background="bg-white border-2 shadow-transparent mx-0"
                        innerWrapper="pb-8"
                    />
                </section>

                <section className="h-[inherit] w-full overflow-hidden rounded-lg bg-white p-4 shadow-sm shadow-slate-300">
                    <div className="border-b-2">
                        <h2 className="mb-2 ml-1 font-[500]">
                            Solved
                            {getValueInArrayCounter(
                                notifications,
                                'status',
                                'Solved',
                            ) >= 1 && (
                                <span className="text-sm">{` (${getValueInArrayCounter(
                                    notifications,
                                    'status',
                                    'Solved',
                                )}):`}</span>
                            )}
                        </h2>
                    </div>

                    <IssueBlock
                        showTitle={true}
                        issueTitle="Solved"
                        issueStatus="Solved"
                        emptyText="No notifications solved."
                        notifications={notifications}
                        background="bg-white border-2 shadow-transparent mx-0"
                        innerWrapper="pb-8"
                    />
                </section>
            </div>
        </section>
    )
}

export default Board
