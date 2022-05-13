import { useState } from 'react'
import Select from 'react-select'
import moment from 'moment'

import { capitalizeFirstLetter } from '_utils/helpers/stringHelpers'

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
    } = notification
    // console.log(typeof time)
    // console.log(Date())
    // Thu May 12 2022 18:03:22 GMT+0200 (CEST)
    // console.log(moment([2022, 4, 12, 18, 2, 10]).fromNow())
    const options = [
        { value: 'jira', label: 'Connect with Jira' },
        { value: 'gitlab', label: 'Connect with GitLab' },
        { value: 'none', label: 'Don`t connect ticket' },
    ]

    // const [selectedType, setSelectedType] = useState(false)

    const jira = false
    const gitlab = true
    const nothing = false
    const undef = false

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
    }
    return (
        <article className="mt-8 grid gap-6  overflow-hidden xl:h-[calc(100%-12rem)] xl:grid-cols-5">
            <div className="flex flex-col items-center justify-center p-4 border rounded-md border-grey-100 xl:col-start-1 xl:col-end-3">
                {jira && <p>jira</p>}
                {gitlab && (
                    <div className="flex flex-col justify-between w-full h-full">
                        <article className="w-full">
                            <h3 className="text-xl font-bold">Status</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <p className="text-grey-500">Assigned to</p>
                                <p>Maarten B</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <p className="text-grey-500">Last updated</p>
                                <p>{moment(time).fromNow()}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <p className="text-grey-500">Priority level</p>
                                <p>High</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <p className="text-grey-500">Status</p>
                                <p>In Progress</p>
                            </div>
                        </article>

                        <article>
                            <h3 className="text-xl font-bold">Description</h3>

                            <p>
                                {capitalizeFirstLetter(service)} {intro}
                            </p>
                        </article>

                        <article className="w-full mt-8">
                            <h3 className="mb-2 text-xl font-bold">
                                Changelog
                            </h3>
                            <ul className="flex flex-col overflow-y-auto ">
                                {STATUS.map(({ state, date, index }, i) => {
                                    // console.log(i)
                                    return (
                                        <li
                                            key={i}
                                            className="flex justify-between mb-2"
                                        >
                                            <div className="flex items-center">
                                                <span
                                                    className={`mr-2 h-4 w-4 rounded-full border-2 border-grey-100 ${
                                                        i == 0 &&
                                                        'border-4 border-grey-900'
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
                                className="block p-2 my-2 text-center bg-white border-2 rounded-md border-grey-900 text-grey-900"
                            >
                                Ticket to GitLab board
                            </a>
                        </div>
                    </div>
                )}
                {nothing && <p>nothing</p>}
                {undef && (
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <label className="mb-4 " for="tickets">
                            Select ticket method
                        </label>

                        <Select options={options} />

                        <input
                            type="submit"
                            className="w-full p-2 mt-4 rounded-md bg-grey-500"
                        />
                    </form>
                )}
            </div>
            <div className="p-4 border border-grey-100 xl:col-start-3 xl:col-end-6">
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
        // <article className="mt-8 grid gap-12  overflow-hidden xl:h-[calc(100%-12rem)] xl:grid-cols-2 xl:grid-rows-6">
        //     <div className="xl:row-start-1 xl:row-end-7 xl:grid-cols-2">
        // <pre className="mb-8">Codefile: {specificCodeFile}</pre>

        // {errorMessage?.length >= 1 ? (
        //     errorMessage.map((line, i) => {
        //         return (
        //             <pre className="text-xs" key={i}>
        //                 {line}
        //             </pre>
        //         )
        //     })
        // ) : (
        //     <pre className="text-xs">no error message</pre>
        // )}
        //     </div>
        //     <div className=" xl:row-start-1 xl:row-end-6 xl:grid-cols-2">
        //         <h2 className="mb-4 text-xl font-semibold">Current status</h2>
        // <ul className="flex flex-col  overflow-y-auto  xl:h-[calc(100%-45px)]">
        //     {STATUS.map(({ state, date, index }, i) => {
        //         return (
        //             <li
        //                 key={i}
        //                 className="after:bg-pink-500 relative ml-12 inline-block rounded-lg p-4 before:absolute before:-left-6 before:top-[50%] before:block before:h-[12px] before:w-[12px] before:translate-y-[-50%] before:rounded-full before:bg-grey-900 after:absolute after:-left-6 after:z-[-1] after:block after:h-[40px] after:w-[4px]
        //                     after:translate-x-[4px] after:bg-grey-900 first-of-type:m-0
        //                     first-of-type:bg-grey-900 first-of-type:pl-16
        //                     first-of-type:text-white first-of-type:before:left-6 first-of-type:before:bg-grey-50 first-of-type:after:left-6 after:last-of-type:hidden
        //                     "
        //             >
        //                 {!i == 0 ? <p>abc</p> : <p>abc weg er mee</p>}
        //                 <div className="flex justify-between">
        //                     <p>{state}</p>
        //                     <p>{date}</p>
        //                 </div>
        //             </li>
        //         )
        //     })}
        // </ul>
        //     </div>

        //     <div className="xl:row-start-6 xl:row-end-7 xl:grid-cols-2">
        //         <a
        //             href="#"
        //             className="block p-2 my-2 text-center bg-white border-2 rounded-md border-grey-900 text-grey-900"
        //         >
        //             Ticket to Jira / GitLab board
        //         </a>
        //     </div>
        // </article>
    )
}

export default NotificationDetails
