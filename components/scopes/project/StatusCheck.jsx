import { useState, useMemo } from 'react'
import Select from 'react-select'

import { getValueInArrayCounter } from '_utils/helpers/arrayHelpers'

import Arrow from '_components/blocks/icons/Arrow'
import List from '_components/blocks/icons/List'
import Grid from '_components/blocks/icons/Grid'

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

    const [value, setValue] = useState({
        key: 'status',
        direction: 'ascending',
    })

    const toggleDirectionValue = (newVal) => {
        let newDirection
        if (value.key === newVal && value.direction === 'ascending') {
            newDirection = 'descending'
        } else {
            newDirection = 'ascending'
        }
        setValue({ key: newVal, direction: newDirection })
    }

    const sortedItems = useMemo(() => {
        return connections.sort((a, b) => {
            if (a[value.key] < b[value.key]) {
                return value.direction === 'ascending' ? -1 : 1
            }

            return value.direction === 'ascending' ? 1 : -1
        })
    }, [value, connections])

    return (
        <section className="desktop:row-start-2 desktop:row-end-3">
            <div className="flex justify-between">
                <h2 className="mb-2 text-xl font-semibold">
                    Connection status:
                </h2>

                <div className="flex gap-2">
                    <span>
                        <List />
                    </span>
                    <span className="opacity-20 hover:cursor-not-allowed ">
                        <Grid />
                    </span>
                </div>
            </div>
            <div className="w-full px-8 pt-8 pb-2 overflow-x-auto bg-white rounded-md shadow-sm shadow-slate-300">
                <div className="grid w-fit grid-cols-[minmax(100px,_1fr)_minmax(75px,_1fr)_minmax(100px,_1fr)_minmax(100px,_1fr)_minmax(175px,_1fr)] gap-x-6 border-b-2 border-b-slate-500  font-bold desktop:w-full desktop:px-6">
                    <span
                        className="flex justify-between"
                        onClick={() => {
                            toggleDirectionValue('name')
                        }}
                    >
                        Service
                        <Arrow
                            className={
                                'duration-300 ease-in hover:cursor-pointer ' +
                                (value.key === 'name'
                                    ? value.direction === 'ascending'
                                        ? '-rotate-90'
                                        : 'rotate-90'
                                    : 'hidden')
                            }
                        />
                    </span>
                    <span
                        className="flex justify-between"
                        onClick={() => {
                            toggleDirectionValue('priority')
                        }}
                    >
                        Priority
                        <Arrow
                            className={
                                'duration-300 ease-in hover:cursor-pointer ' +
                                (value.key === 'priority'
                                    ? value.direction === 'ascending'
                                        ? '-rotate-90'
                                        : 'rotate-90'
                                    : 'hidden')
                            }
                        />
                    </span>
                    <span
                        className="flex justify-between"
                        onClick={() => {
                            toggleDirectionValue('type')
                        }}
                    >
                        Type
                        <Arrow
                            className={
                                'duration-300 ease-in hover:cursor-pointer ' +
                                (value.key === 'type'
                                    ? value.direction === 'ascending'
                                        ? '-rotate-90'
                                        : 'rotate-90'
                                    : 'hidden')
                            }
                        />
                    </span>
                    <span
                        className="flex justify-between"
                        onClick={() => {
                            toggleDirectionValue('status')
                        }}
                    >
                        Status
                        <Arrow
                            className={
                                'duration-300 ease-in hover:cursor-pointer ' +
                                (value.key === 'status'
                                    ? value.direction === 'ascending'
                                        ? '-rotate-90'
                                        : 'rotate-90'
                                    : 'hidden')
                            }
                        />
                    </span>
                    <span>Few seconds ago</span>
                </div>

                <ul className="flex flex-col pb-4 gap-y-0">
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
    const statusCheck = useMemo(() => {
        const duplicate = notifications.some((elem) => {
            return (
                elem.status !== 'Solved' &&
                elem.service === name.toLocaleLowerCase()
            )
        })

        return duplicate ? 'Problem detected' : 'Online'
    }, [notifications, name])

    return (
        <li className="border-grey-400 grid w-fit grid-cols-[minmax(100px,_1fr)_minmax(75px,_1fr)_minmax(100px,_1fr)_minmax(100px,_1fr)_minmax(175px,_1fr)] gap-x-6  border-b py-2 px-2 text-xs shadow-sm  odd:bg-slate-200 even:bg-white  desktop:w-full desktop:px-6 desktop:text-base">
            <div className="flex items-center justify-between">
                <div className="flex">
                    <img className="w-6 h-6 mr-2" src={icon} alt="" />
                    <p>{name}</p>
                </div>
            </div>
            <div className="flex items-center">
                {priority == 1 ? 'High' : priority == 2 ? 'Medium' : 'Low'}
            </div>
            <div className="flex items-center">{type}</div>
            <div
                className={
                    'flex h-6 flex-col items-center justify-center rounded-full text-center text-sm text-white ' +
                    (statusCheck === 'Problem detected'
                        ? 'bg-red-800'
                        : 'bg-green-800')
                }
            >
                {statusCheck}
            </div>
            <div className="flex items-center">
                <p>{statusCheck === 'Online' ? '—' : '1h ago'}</p>
            </div>
        </li>
    )
}

export default StatusCheck
