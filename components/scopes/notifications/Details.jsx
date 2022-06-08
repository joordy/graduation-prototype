import { useCallback, useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Select from 'react-select'
import moment from 'moment'

import { capitalizeFirstLetter } from '_utils/helpers/stringHelpers'
import { supabase } from 'utils/database/init'

import Changelog from '_components/blocks/Changelog'
import Priority from '_components/blocks/notificationElements/Priority'
import EmptyState from '_components/blocks/icons/Empty'

const Details = ({ STATUS, notification, ...props }) => {
    const {
        service,
        codeFile,
        codeLine,
        codeFunction,
        errorMessage,
        message,
        tickets,
    } = notification

    const checkCodeFile =
        (codeFile == '' || codeFile == 'false') &&
        (codeLine == '' || codeLine == 'false') &&
        (codeFunction == '' || codeFunction == 'false')

    return (
        <article className="mt-8 flex min-h-[50vh] flex-col gap-4 rounded-xl bg-flashWhite shadow-lg desktop:grid  desktop:grid-cols-[minmax(500px,_4fr)_minmax(400px,_3fr)] desktop:gap-0">
            <div className="p-2 rounded-lg desktop:p-8 ">
                <h2 className="pb-2 text-xl font-bold border-b-2 border-b-brightGray">{`${capitalizeFirstLetter(
                    service,
                )} ${message}`}</h2>

                {!checkCodeFile && (
                    <div className="flex items-center w-full">
                        <p className="flex flex-col">
                            <span className="mt-4 mr-2 font-bold">
                                Appeared in:
                            </span>
                            <pre className="my-2 text-xs break-normal ">{`${capitalizeFirstLetter(
                                codeFile,
                            )} @ ${codeFunction} on line ${codeLine}`}</pre>
                        </p>
                    </div>
                )}

                <h3></h3>

                <div className="pb-4 mt-4 overflow-hidden overflow-x-scroll rounded-sm bg-flashWhite">
                    {errorMessage?.length >= 1 ? (
                        <>
                            <span className="font-bold">Error message:</span>

                            {errorMessage.map((line, i) => {
                                return (
                                    <pre className="mb-1 text-xs" key={i}>
                                        {line}
                                    </pre>
                                )
                            })}
                        </>
                    ) : (
                        <pre className="text-xs">no error message</pre>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-b-lg desktop:rounded-lg">
                <TicketSelector notification={notification} type={tickets} />
            </div>
        </article>
    )
}

const TicketSelector = ({ notification, type }) => {
    const { tickets, slug } = notification
    const [ticketType, setTicketType] = useState(tickets)
    const router = useRouter()

    const refreshData = () => {
        router.replace(router.asPath)
    }

    const options = [
        { value: 'internal', label: 'Continue without ticket system' },
        { value: 'jira', label: 'Continue with Jira' },
        { value: 'gitlab', label: 'Continue with GitLab' },
    ]

    const onHandleChange = (e) => {
        setTicketType(e.value)
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()

        const { data, error } = await supabase
            .from('notifications')
            .update({ tickets: ticketType })
            .match({ notification_id: slug })

        refreshData()
    }

    switch (type) {
        case 'jira':
            return <TicketElement type={tickets} notification={notification} />
        case 'gitlab':
            return <TicketElement type={tickets} notification={notification} />
        case 'none':
            return <TicketElement type={tickets} notification={notification} />
        default:
            return (
                <form
                    onSubmit={onHandleSubmit}
                    className="flex flex-col items-center justify-start w-full gap-4 "
                >
                    <EmptyState styles={'w-48'} />

                    <fieldset className="flex flex-col w-full gap-2">
                        <label className="font-bold">
                            Connect ticket with notification
                        </label>

                        <Select
                            options={options}
                            classNamePrefix="filter"
                            onChange={onHandleChange}
                            value={
                                ticketType
                                    ? options.find(
                                          (obj) => obj.value === ticketType,
                                      )
                                    : options[2].label
                            }
                        />

                        <input
                            type="submit"
                            value="Set ticket type"
                            className="w-full py-2 font-medium rounded-md bg-violetBlue text-offWhite"
                        />
                    </fieldset>
                </form>
            )
    }
}

const TicketElement = ({ type, notification }) => {
    const {
        service,
        intro,
        projectIcon,
        slug,
        specificCodeFile,
        errorMessage,
        time,
        tickets,
        assignedTo,
        name,
        message,
        status,
        priorityLevel,
    } = notification

    const [selectedFilter, setSelectedFilter] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)
    const router = useRouter()

    const refreshData = async () => {
        router.replace(router.asPath)
    }

    const onHandleReset = async () => {
        const { data, error } = await supabase
            .from('notifications')
            .update({ tickets: '' })
            .match({ notification_id: slug })

        refreshData()
    }

    // console.log({ selectedUser, selectedFilter })
    const handleUserChange = useCallback(async (e) => {
        setSelectedUser(e.value)

        const { data, error } = await supabase
            .from('notifications')
            .update({ assignedTo: e.value })
            .match({ notification_id: slug })
    }, [])

    // console.log(notification)
    const handleFilterChange = useCallback(async (e) => {
        setSelectedFilter(e.value)

        // const { data, error } = await supabase
        //     .from('projects')
        //     .select()
        //     //     .update({connections[service]})
        //     .match({ slug: name })
        //     .single()

        // console.log({ data, error })

        // const connections = data.connections
        // console.log(
        //     '🚀 ~ file: Details.jsx ~ line 211 ~ handleFilterChange ~ connections',
        //     connections,
        // )
        // console.log(selectedFilter)
        // const newObj = connections.map((elem) => {
        //     return {
        //         icon: elem.icon,
        //         name: elem.name,
        //         type: elem.type,
        //         status:
        //             elem.name.toLocaleLowerCase() === service &&
        //             e.value === 'solved'
        //                 ? true
        //                 : elem.status,
        //         priority: elem.priority,
        //     }
        //     // console.log(elem)
        // })
        // console.log(newObj)
        // const { data, error } = await supabase
        //     .from('notifications')
        //     .update({ status: e.value })
        //     .match({ notification_id: slug })
        //     .single()

        // const { data: test, error: abc } = await supabase
        //     .from('projects')
        //     .update({connections[service]})
        //     .match({ slug: name })

        // console.log({ test, abc })
    }, [])

    //     setSelectedFilter(e.value)
    //     console.log(selectedFilter)
    //     // const { data, error } = await supabase
    //     //     .from('notifications')
    //     //     .update({ status: e.value })
    //     //     .match({ notification_id: slug })
    //     //     .single()
    //     // console.log({ data, error })
    // }

    const ticketOptions = [
        { value: 'Reported', label: 'Reported' },
        { value: 'In progress', label: 'In progress' },
        { value: 'Solved', label: 'Solved' },
    ]

    const userOptions = [
        { value: '—', label: 'Nobody' },
        { value: 'Maarten', label: 'Maarten' },
        { value: 'Sergio', label: 'Sergio' },
        { value: 'Charlotte', label: 'Charlotte' },
        { value: 'Maikel', label: 'Maikel' },
    ]

    return (
        <section className="flex flex-col justify-between w-full h-full">
            <h2 className="pb-2 text-xl font-bold border-b-2 border-b-brightGray">
                Ticket information
            </h2>

            <aside className="flex flex-col pb-4 my-4 border-b-2 border-b-brightGray">
                <section className="flex h-8 ">
                    <h3 className="w-[50%] text-sm font-bold">Priority</h3>
                    <Priority
                        priority={priorityLevel}
                        styles={'w-50% py-3 px-6'}
                    />
                </section>
                <section className="flex items-center h-12">
                    <h3 className="w-[50%] text-sm font-bold">Assignee:</h3>
                    <Select
                        className="w-48 text-sm"
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
                </section>
                <section className="flex items-center h-12">
                    <h3 className="w-[50%] text-sm font-bold">Status:</h3>

                    <div>
                        <Select
                            className="w-48 text-sm"
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
                        <div className="max-w"></div>
                    </div>
                </section>
                <section className="flex h-8 ">
                    <h3 className="w-[50%] text-sm font-bold">Last update:</h3>
                    <p>1h ago</p>
                </section>
            </aside>

            <aside className="flex flex-col pb-4 mb-4 border-b-2 border-b-brightGray">
                <h3 className="mb-2 text-sm font-bold ">Changelog</h3>

                <Changelog
                    className="text-raisinBlack opacity-80"
                    title={false}
                />
            </aside>

            <aside className="flex flex-col justify-center w-full">
                <div className="flex items-center h-8">
                    <h3 className="w-[50%] text-sm font-bold">
                        Connected ticket
                    </h3>
                    <div className="flex justify-end w-full">
                        <span className="flex items-center">
                            <img
                                src={`/icons/${type}.png`}
                                alt=""
                                className="w-6 h-6 mr-2"
                            />
                            <p>{capitalizeFirstLetter(type)}</p>
                        </span>{' '}
                    </div>
                </div>

                <div className="flex items-center h-8 ">
                    <h3 className="w-[50%] text-sm font-bold">Link</h3>
                    <div className="flex justify-end w-full">
                        <button
                            onClick={onHandleReset}
                            className="px-2 py-1 text-sm font-bold border-2 rounded-md border-violetBlue text-violetBlue"
                        >
                            Reset ticket type
                        </button>
                    </div>
                </div>

                <Link href="#">
                    <a className="px-2 py-1 mt-2 text-sm text-center border-2 rounded-lg border-violetBlue text-violetBlue hover:bg-violetBlue hover:text-white">
                        Link to the {capitalizeFirstLetter(type)} board
                    </a>
                </Link>
            </aside>
        </section>
    )
}

export default Details
