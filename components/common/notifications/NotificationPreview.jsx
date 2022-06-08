import { useCallback, useState } from 'react'
import moment from 'moment'
import Select from 'react-select'
import { toast } from 'react-toastify'

import { capitalizeFirstLetter } from 'utils/helpers/stringHelpers'
import { supabase } from 'utils/database/init'

import Priority from '_components/blocks/notificationElements/Priority'
import Status from '_components/blocks/notificationElements/Status'
import Title from '_components/blocks/notificationElements/Title'
import Assigned from '_components/blocks/notificationElements/Assigned'
import Close from '_components/blocks/icons/Close'
import Changelog from '_components/blocks/Changelog'
import Popup from '_components/common/notifications/Popup'

const NotificationPreview = ({ data }) => {
    const {
        assignedTo,
        priorityLevel,
        serviceIcon,
        status,
        service,
        name,
        message,
        slug,
    } = data
    const [openTab, setOpenTab] = useState(1)
    const [currentIndex, setCurrentIndex] = useState(null)
    const [selectedFilter, setSelectedFilter] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    const projectName = name.replaceAll('-', '')

    const ticketOptions = [
        { value: 'Reported', label: 'Reported' },
        { value: 'In progress', label: 'In progress' },
        { value: 'solved', label: 'Solved' },
    ]

    const handleFilterChange = useCallback(async (e) => {
        setSelectedFilter(e.value)

        const { data, error } = await supabase
            .from('notifications')
            .update({ status: e.value })
            .match({ notification_id: slug })
            .single()

        toast(
            <Popup
                id={1234567}
                message={'Updated ticket'}
                intro={`you've updated the ticket status.`}
                icon={serviceIcon}
            />,
            { toastId: 1234567 },
        )
    }, [])

    const handleUserChange = useCallback(async (e) => {
        setSelectedUser(e.value)

        const { data, error } = await supabase
            .from('notifications')
            .update({ assignedTo: e.value })
            .match({ notification_id: slug })

        toast(
            <Popup
                id={1234567}
                message={'Updated ticket'}
                intro={`You've updated the user.`}
                icon={serviceIcon}
            />,
            { toastId: 1234567 },
        )
    }, [])

    const userOptions = [
        { value: 'Nobody', label: 'Nobody' },
        { value: 'Maarten', label: 'Maarten' },
        { value: 'Sergio', label: 'Sergio' },
        { value: 'Charlotte', label: 'Charlotte' },
        { value: 'Maikel', label: 'Maikel' },
    ]

    return (
        <section className="relative w-full p-4 overflow-y-auto bg-white rounded-lg shadow-sm shadow-slate-300 ">
            <header className="flex items-center gap-4 mx-1 mb-4">
                <span className="flex items-center gap-4">
                    <h2 className="text-xl font-bold">
                        {capitalizeFirstLetter(projectName)}.com
                    </h2>
                </span>

                <Priority priority={priorityLevel} styles={'w-50% py-4 px-6'} />
            </header>

            <section className="py-4 mx-1 mb-4">
                <div className="flex flex-col gap-2 desktop:flex-row desktop:justify-between">
                    <div className="flex flex-col w-full">
                        <h3 className="w-32 mb-2 font-bold text-raisinBlack">
                            Status:
                        </h3>
                        <Select
                            className="w-full text-xs"
                            options={ticketOptions}
                            onChange={handleFilterChange}
                            value={
                                selectedFilter
                                    ? ticketOptions.find(
                                          (obj) => obj.value === selectedFilter,
                                      )
                                    : ticketOptions.find(
                                          (obj) => obj.value === status,
                                      )
                            }
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <h3 className="w-32 mb-2 font-bold text-raisinBlack">
                            Assignee:
                        </h3>
                        <Select
                            className="w-full text-xs"
                            options={userOptions}
                            onChange={handleUserChange}
                            value={
                                selectedUser
                                    ? userOptions.find(
                                          (obj) => obj.value === selectedUser,
                                      )
                                    : userOptions.find((obj) =>
                                          assignedTo
                                              ? obj.value === assignedTo
                                              : obj.value === 'Nobody',
                                      )
                            }
                        />
                    </div>
                </div>
            </section>

            <section className="py-2 mx-1 mb-2">
                <ul className="flex gap-4 border-b-2 border-b-black">
                    <li>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setOpenTab(1)
                            }}
                        >
                            <h3
                                className={
                                    openTab === 1 ? ' border-b font-bold' : ''
                                }
                            >
                                Error message
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
                                    openTab === 2 ? ' border-b font-bold' : ''
                                }
                            >
                                Changelog
                            </h3>
                        </button>
                    </li>
                </ul>

                <article
                    className={
                        'flex flex-col gap-4 bg-slate-100 p-4 ' +
                        (openTab === 1 ? 'block' : 'hidden')
                    }
                >
                    <section>
                        <h3 className="mb-1 font-bold">Description:</h3>
                        <div className="">
                            {capitalizeFirstLetter(service)} {message}
                        </div>
                    </section>

                    <section>
                        <h3 className="mb-1 font-bold">Error message:</h3>
                        <div className="p-2 border rounded-sm border-brightGray ">
                            {/* {capitalizeFirstLetter(service)} {message} */}
                            {data.errorMessage?.length >= 1 ? (
                                data.errorMessage.map((line, i) => {
                                    return (
                                        <pre
                                            className="text-xs whitespace-normal"
                                            key={i}
                                        >
                                            {line}
                                        </pre>
                                    )
                                })
                            ) : (
                                <pre className="text-xs">no error message</pre>
                            )}
                        </div>
                    </section>
                </article>

                <article
                    className={
                        'flex flex-col gap-4 ' +
                        (openTab === 2 ? 'block' : 'hidden')
                    }
                >
                    <section className="p-4 bg-slate-100 ">
                        <h3 className="mb-4 font-bold">Recent changes:</h3>
                        <Changelog
                            className="text-black opacity-80"
                            title={false}
                        />
                    </section>
                </article>
            </section>
        </section>
    )
}
const Element = ({ char, name }) => {
    return (
        <div className="flex">
            {char && (
                <span className="flex flex-col items-center justify-center w-6 h-6 row-start-2 mr-2 text-sm text-right rounded-full z-1 text-grey-900 bg-brightGray group">
                    {char}
                </span>
            )}
            {name && <p>{name}</p>}
        </div>
    )
}

export default NotificationPreview
