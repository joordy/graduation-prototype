import { useState } from 'react'
import Select from 'react-select'

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
        <section className="lg:grid lg:grid-cols-3 lg:grid-rows-[48px_auto] lg:gap-x-4">
            <aside className="flex items-center justify-between lg:col-start-1 lg:col-end-5 lg:row-start-1">
                <h2 className="text-xl font-bold">Issues</h2>

                <form action="">
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

            <IssueBlock
                issueTitle="Recent"
                issueStatus="Reported"
                emptyText="No notifications reported."
                notifications={notifications}
            />

            <IssueBlock
                issueTitle="In Progress"
                issueStatus="In progress"
                emptyText="No notifications in progress yet."
                notifications={notifications}
            />

            <IssueBlock
                issueTitle="Solved"
                issueStatus="Solved"
                emptyText="No notifications solved."
                notifications={notifications}
            />
        </section>
    )
}

export default Board
