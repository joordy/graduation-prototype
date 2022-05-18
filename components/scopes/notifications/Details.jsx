import { useState, useRef, useEffect } from 'react'
import Select from 'react-select'
import moment from 'moment'

import { capitalizeFirstLetter } from '_utils/helpers/stringHelpers'
import { supabase } from 'utils/database/init'

const NotificationDetails = ({ STATUS, notification, ...props }) => {
    const {
        projectName,
        service,
        intro,
        projectIcon,
        slug,
        specificCodeFile,
        errorMessage,
        time,
        tickets,
    } = notification

    const [ticketType, setTicketType] = useState(tickets)
    const [selectedValue, setSelectedValue] = useState(null)

    const updateTickets = async () => {
        console.log(slug)
        const { data, error } = await supabase
            .from('notifications')
            .update({ tickets: selectedValue })
            .match({ slug: slug })
            .single()

        console.log(data, error)
    }

    const getData = async () => {
        console.log(slug)
        const { data, error } = await supabase
            .from('notifications')
            .select()
            .match({ slug: slug })
            .single()

        // console.log(data, error)
        return data
    }

    useEffect(() => {
        // getData()
    }, [])

    const options = [
        { value: 'none', label: 'Continue without ticket system' },
        { value: 'jira', label: 'Continue with Jira' },
        { value: 'gitlab', label: 'Continue with GitLab' },
    ]

    const onHandleChange = (e) => {
        setSelectedValue(e.value)
    }

    const onHandleSubmit = (e) => {
        e.preventDefault()
    }

    const TicketElement = ({ type }) => {
        const abc = getData()
        // console.log(abc)
        switch (type) {
            case 'jira':
                return <p>jira type</p>
            case 'gitlab':
                return (
                    <GitlabElement
                        notification={notification}
                        STATUS={STATUS}
                        onClick={(e) => setSelectedValue(null)}
                        ticketUpdate={() => updateTickets()}
                    />
                )
            case 'none':
                return <p>intern type</p>
            default:
                return (
                    <form
                        onSubmit={onHandleSubmit}
                        className="flex flex-col w-full gap-4 px-16"
                    >
                        <label className="font-bold">
                            Connect ticket with this notification
                        </label>
                        <Select
                            options={options}
                            classNamePrefix="filter"
                            onChange={onHandleChange}
                            value={
                                selectedValue
                                    ? options.find(
                                          (obj) => obj.value === selectedValue,
                                      )
                                    : options[2].label
                            }
                        />

                        <input
                            type="submit"
                            value="Set ticket type"
                            className="w-full py-2 rounded-md bg-grey-400"
                        />
                    </form>
                )
        }
    }

    return (
        <article className="mt-8 grid gap-6  overflow-hidden xl:h-[calc(100%-12rem)] xl:grid-cols-5">
            <div className="flex flex-col items-center justify-center p-4 border rounded-md border-grey-100 xl:col-start-1 xl:col-end-3">
                <TicketElement type={selectedValue} />
            </div>
            <div className="flex flex-col justify-center p-4 border border-grey-100 xl:col-start-3 xl:col-end-6">
                <pre className="mb-8">
                    Error appeared in: {specificCodeFile}
                </pre>

                {errorMessage?.length >= 1 ? (
                    errorMessage.map((line, i) => {
                        return (
                            <pre className="text-xs" key={i}>
                                {line}
                            </pre>
                        )
                    })
                ) : (
                    <pre className="text-xs">no error message</pre>
                )}
            </div>
        </article>
    )
}

const JiraElement = () => {}
const GitlabElement = ({ notification, STATUS, onClick, ticketUpdate }) => {
    const {
        projectName,
        service,
        intro,
        projectIcon,
        slug,
        specificCodeFile,
        errorMessage,
        time,
        tickets,
        assignedTo,
        message,
        status,
        priorityLevel,
    } = notification
    // console.log('🚀 ~', notification)

    return (
        <div className="flex flex-col justify-between w-full h-full">
            <article>
                <h3>Connected with: Gitlab</h3>
                <button onClick={onClick}>Reset</button>
                <button onClick={ticketUpdate}>ticketUpdate</button>
            </article>
            <article className="w-full">
                <h3 className="text-xl font-bold">Status</h3>

                <div className="grid grid-cols-2 gap-4">
                    <p className="text-grey-500">Assigned to</p>
                    <p>{!!assignedTo ? assignedTo : 'Nobody'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <p className="text-grey-500">Last updated</p>
                    <p>{moment(time).fromNow()}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <p className="text-grey-500">Priority</p>
                    <p>
                        {priorityLevel == 1
                            ? 'High'
                            : priorityLevel == 2
                            ? 'Medium'
                            : 'Low'}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <p className="text-grey-500">Status</p>
                    <p>{status}</p>
                </div>
            </article>

            <article>
                <h3 className="text-xl font-bold">Description</h3>

                <p>
                    {capitalizeFirstLetter(service)} {message}
                </p>
            </article>

            <article className="w-full mt-8">
                <h3 className="mb-2 text-xl font-bold">Changelog</h3>
                <ul className="flex flex-col overflow-y-auto ">
                    {STATUS.map(({ state, date, index }, i) => {
                        return (
                            <li key={i} className="flex justify-between mb-2">
                                <div className="flex items-center">
                                    <span
                                        className={`mr-2 h-4 w-4 rounded-full border-2 border-grey-100 ${
                                            i == 0 && 'border-4 border-grey-900'
                                        }`}
                                    ></span>
                                    <p>{state}</p>
                                </div>
                                <p>{date}</p>
                            </li>
                        )
                    })}
                </ul>
            </article>

            <div className="w-full">
                <a
                    href="#"
                    target="_blank"
                    className="block p-2 my-2 text-center bg-white border-2 rounded-md border-grey-900 text-grey-900"
                >
                    Ticket to GitLab board
                </a>
            </div>
        </div>
    )
}
const NormalElement = () => {}

export default NotificationDetails
