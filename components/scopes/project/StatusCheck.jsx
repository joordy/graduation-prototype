import { useState, useMemo } from 'react'
import Select from 'react-select'

import { getValueInArrayCounter } from '_utils/helpers/arrayHelpers'

const StatusCheck = ({ project = {}, notifications = [] }) => {
    const [selectedFilter, setSelectedFilter] = useState(null)

    const statusFilters = [
        { value: 'highToLow', label: 'Priority: High — Low' },
        { value: 'lowToHigh', label: 'Priority: Low — High' },
    ]

    const handleFilterChange = (e) => {
        setSelectedFilter(e.value)
    }

    const connections = useMemo(() => {
        return project?.connections.sort((a, b) => {
            if (selectedFilter === 'highToLow') {
                return a.priority - b.priority
            } else if (selectedFilter === 'lowToHigh') {
                return b.priority - a.priority
            }
        })
    }, [project?.connections, selectedFilter])

    return (
        <section className="desktop:row-start-2 desktop:row-end-3">
            <div className="flex justify-between">
                <h2 className="mb-2 text-xl font-semibold">Current status:</h2>

                <form action="">
                    <Select
                        options={statusFilters}
                        onChange={handleFilterChange}
                        className="w-48 text-xs"
                        value={
                            selectedFilter
                                ? statusFilters.find(
                                      (obj) => obj.value === selectedFilter,
                                  )
                                : statusFilters[0]
                        }
                    />
                </form>
            </div>
            <div>
                <div className="grid grid-cols-5 pb-2 mt-12 mb-2 font-bold border-b-2 gap-x-6">
                    <span>Service</span>
                    <span>Priority</span>
                    <span>Type</span>
                    <span>Status</span>
                    <span>Latest check</span>
                </div>

                <ul className="flex flex-col gap-y-4">
                    {connections.map(
                        ({ icon, name, priority, type, status }, i) => {
                            return (
                                <ConnectionList
                                    notifications={notifications}
                                    key={i}
                                    icon={icon}
                                    name={name}
                                    priority={priority}
                                    type={type}
                                    status={status}
                                />
                            )
                        },
                    )}
                </ul>
            </div>
        </section>
    )
}

const ConnectionList = ({
    notifications,
    icon,
    name,
    priority,
    type,
    status,
}) => {
    return (
        <li className="grid grid-cols-5 pt-2 pb-4 border-b border-grey-400 gap-x-6">
            <div className="flex items-center justify-between">
                <div className="flex">
                    <img className="w-6 h-6 mr-2" src={icon} alt={name} />
                    <p>{name}</p>
                </div>
                <span
                    className={`bg-grey-100 flex h-5  w-5 items-center  justify-center rounded-md text-[10px]  duration-150 ease-in`}
                >
                    {getValueInArrayCounter(
                        notifications,
                        'service',
                        name,
                        true,
                    )}
                </span>
            </div>
            <div>
                {priority == 1 ? 'High' : priority == 2 ? 'Medium' : 'Low'}
            </div>
            <div>{type}</div>
            <div className="rounded-full bg-[green] text-center text-white">
                {status ? 'Online' : 'Problem detected'}
            </div>
            <div>
                <p>20-04-2022 — 14:45</p>
            </div>
        </li>
    )
}

export default StatusCheck
