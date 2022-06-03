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
                <h2 className="mb-2 text-xl font-semibold">
                    Connection status:
                </h2>

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
            <div className="w-full overflow-x-auto">
                <div className="mt-4 mb-2 grid w-fit grid-cols-[minmax(100px,_1fr)_minmax(75px,_1fr)_minmax(100px,_1fr)_minmax(100px,_1fr)_minmax(175px,_1fr)] gap-x-6 border-b-2 pb-2 font-bold desktop:w-full">
                    <span>Service</span>
                    <span>Priority</span>
                    <span>Type</span>
                    <span>Status</span>
                    <span>Latest check</span>
                </div>

                <ul className="flex flex-col pb-4 ">
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
        <li className="border-grey-400 grid w-fit grid-cols-[minmax(100px,_1fr)_minmax(75px,_1fr)_minmax(100px,_1fr)_minmax(100px,_1fr)_minmax(175px,_1fr)] gap-x-6 border-b py-2 text-xs desktop:w-full desktop:text-base">
            <div className="flex items-center justify-between">
                <div className="flex">
                    <img className="w-6 h-6 mr-2" src={icon} alt="" />
                    <p>{name}</p>
                </div>
                {/* <span
                    className={`bg-grey-100 flex h-5  w-5 items-center  justify-center rounded-md text-[10px]  duration-150 ease-in`}
                >
                    {getValueInArrayCounter(
                        notifications,
                        'service',
                        name,
                        true,
                    )}
                </span> */}
            </div>
            <div className="flex items-center">
                {priority == 1 ? 'High' : priority == 2 ? 'Medium' : 'Low'}
            </div>
            <div className="flex items-center">{type}</div>
            <div className="flex h-8 flex-col items-center justify-center rounded-full bg-[green] text-center text-white">
                {status ? 'Online' : 'Problem detected'}
            </div>
            <div className="flex items-center">
                <p>20-04-2022 — 14:45</p>
            </div>
        </li>
    )
}

export default StatusCheck
