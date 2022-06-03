import { useCallback, useState } from 'react'
import moment from 'moment'
import Select from 'react-select'

import Priority from '_components/blocks/notificationElements/Priority'
import Status from '_components/blocks/notificationElements/Status'
import Title from '_components/blocks/notificationElements/Title'
import Assigned from '_components/blocks/notificationElements/Assigned'
import Close from '_components/blocks/icons/Close'

import { capitalizeFirstLetter } from 'utils/helpers/stringHelpers'
import Changelog from '_components/blocks/Changelog'

const NotificationPreview = ({ data }) => {
    const { assignedTo, priorityLevel, status, service, name, message, slug } =
        data
    const [openTab, setOpenTab] = useState(1)
    const [currentIndex, setCurrentIndex] = useState(null)
    const [selectedFilter, setSelectedFilter] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    console.log(
        '🚀 ~ file: NotificationPreview.jsx ~ line 233 ~ NotificationPreview ~ data',
        data,
    )

    const projectName = name.replaceAll('-', '')

    const ticketOptions = [
        { value: 'Reported', label: 'Reported' },
        { value: 'In progress', label: 'In progress' },
        { value: 'solved', label: 'Solved' },
    ]

    const handleFilterChange = useCallback((e) => {
        setSelectedFilter(e.value)
    }, [])

    const handleUserChange = useCallback((e) => {
        setSelectedUser(e.value)
    }, [])

    const userOptions = [
        { value: 'Nobody', label: 'Nobody' },
        { value: 'Maarten', label: 'Maarten' },
        { value: 'Sergio', label: 'Sergio' },
        { value: 'Charlotte', label: 'Charlotte' },
        { value: 'Maikel', label: 'Maikel' },
    ]

    return (
        <section className="relative w-full mt-10 overflow-y-scroll bg-white border shadow-md rounded-xl border-flashWhite">
            <header className="flex items-center justify-between p-4 ">
                <span className="flex items-center gap-4">
                    <h2 className="text-xl font-bold">
                        {capitalizeFirstLetter(projectName)}.com
                    </h2>
                </span>
                <Close styles="w-18" />
            </header>

            <section className="flex flex-col gap-2 px-4 py-4 mx-4 ">
                {/* <div className="flex items-center">
                    <h3 className="w-32">Priority:</h3>
                </div> */}

                <div className="flex flex-col gap-2 ">
                    <div className="flex ">
                        <h3 className="w-32 mb-2 font-bold text-raisinBlack">
                            Priority:
                        </h3>
                        <Priority
                            styles={'py-4 px-6'}
                            priority={priorityLevel}
                        />
                    </div>
                    <div className="flex ">
                        <h3 className="w-32 mb-2 font-bold text-raisinBlack">
                            Status:
                        </h3>
                        <Select
                            className="w-64 text-sm"
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

                    <div className="flex w-full">
                        <h3 className="w-32 mb-2 font-bold text-raisinBlack">
                            Assignee:
                        </h3>
                        <Select
                            className="w-64 text-sm"
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

            <section className="px-4 py-8 mx-4 mb-4 bg-flashWhite">
                <ul className="flex gap-4 mb-4 border-b-2 border-b-raisinBlack">
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
                        'flex flex-col gap-4 ' +
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
                        <div className="p-2 border rounded-sm border-brightGray">
                            {/* {capitalizeFirstLetter(service)} {message} */}
                            {data.errorMessage?.length >= 1 ? (
                                data.errorMessage.map((line, i) => {
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
                    </section>
                </article>

                <article
                    className={
                        'flex flex-col gap-4 ' +
                        (openTab === 2 ? 'block' : 'hidden')
                    }
                >
                    <section>
                        <Changelog title={false} />
                    </section>
                </article>
                {/* <section className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="flex text-xl font-bold ">
                            {`${capitalizeFirstLetter(service)} ${message}`}
                        </h3>

                        <Priority
                            styles={'py-4 px-8'}
                            priority={priorityLevel}
                        />
                    </div>

                    <article className="mb-4">
                        {elements.map((item, i) => {
                            return (
                                <div key={i} className="flex items-center mb-2">
                                    <span className="w-[50%]">
                                        <p className="text-[#808080]">
                                            {item.label}
                                        </p>
                                    </span>
                                    <span className="w-[50%]">
                                        {item.value}
                                    </span>
                                </div>
                            )
                        })}
                    </article>
                </section> */}
            </section>
            {/* <header className="sticky top-0 flex items-center justify-between px-8 py-4 text-sm bg-white rounded-t-lg shadow-sm">
                <h2 className="font-bold">{projectName}.com</h2>
                <Close styles="w-18" />
            </header>

            <main className="px-8 py-4">
                <section className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="flex text-xl font-bold ">
                            {`${capitalizeFirstLetter(service)} ${message}`}
                        </h3>

                        <Priority
                            styles={'py-4 px-8'}
                            priority={priorityLevel}
                        />
                    </div>

                    <article className="mb-4">
                        {elements.map((item, i) => {
                            return (
                                <div key={i} className="flex items-center mb-2">
                                    <span className="w-[50%]">
                                        <p className="text-[#808080]">
                                            {item.label}
                                        </p>
                                    </span>
                                    <span className="w-[50%]">
                                        {item.value}
                                    </span>
                                </div>
                            )
                        })}
                    </article>
                </section>

                <ul className="flex gap-4 mb-4 border-b-2 border-b-raisinBlack">
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
                                Description
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

                <section className={openTab === 1 ? 'block' : 'hidden'}>
                    <h4 className="mb-2 font-bold">Error message:</h4>
                    <p>{`${capitalizeFirstLetter(service)} ${message}`}</p>
                    <h4 className="mt-4 font-bold">Error:</h4>
                    {data.specificCodeFile && (
                        <pre className="mb-2">
                            `Error appeared in: ${data.specificCodeFile}`
                        </pre>
                    )}
                    <div className="px-2 py-4 mb-4 text-xs border border-raisinBlack desktop:col-start-3 desktop:col-end-6">
                        {/* <h3 className="mb-2 text-xl font-bold">
                            Error message
                        </h3> *

                        {data.errorMessage?.length >= 1 ? (
                            data.errorMessage.map((line, i) => {
                                return (
                                    <pre className="text-[10px]" key={i}>
                                        {line}
                                    </pre>
                                )
                            })
                        ) : (
                            <pre className="text-xs">no error message</pre>
                        )}
                    </div>
                </section>

                <div className={openTab === 2 ? 'block' : 'hidden'}>
                    <Changelog title={false} />
                     <section className="w-full pb-4 mb-4 ">
                        <ul className="flex flex-col overflow-y-auto ">
                            {STATUS.map(({ state, date, index }, i) => {
                                return (
                                    <li
                                        key={i}
                                        className="flex justify-between text-sm"
                                    >
                                        <p>{state}</p>
                                        <p>{date}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </section> *
                </div>

                {/* <section className="pb-4 mb-4 border-b-2 border-b-raisinBlack">
                    <h3 className="mb-2 text-xl font-bold">Description</h3>

                    <p>{capitalizeFirstLetter(message)}</p>
                </section>

                <section className="pb-4 mb-4 text-xs border-b-2 border-b-raisinBlack desktop:col-start-3 desktop:col-end-6">
                    <h3 className="mb-2 text-xl font-bold">Error message</h3>

                    <pre className="mb-8">
                        Error appeared in: {data.specificCodeFile}
                    </pre>

                    {data.errorMessage?.length >= 1 ? (
                        data.errorMessage.map((line, i) => {
                            return (
                                <pre className="text-[10px]" key={i}>
                                    {line}
                                </pre>
                            )
                        })
                    ) : (
                        <pre className="text-xs">no error message</pre>
                    )}
                </section>

                <section className="w-full pb-4 mb-4 ">
                    <h3 className="mb-2 text-xl font-bold">Changelog</h3>
                    <ul className="flex flex-col overflow-y-auto ">
                        {STATUS.map(({ state, date, index }, i) => {
                            return (
                                <li
                                    key={i}
                                    className="flex justify-between text-sm"
                                >
                                    <p>{state}</p>
                                    <p>{date}</p>
                                </li>
                            )
                        })}
                    </ul>
                </section> *
            </main> */}
        </section>
    )
}
const Element = ({ char, name }) => {
    return (
        <div className="flex">
            {char && (
                <span className="flex flex-col items-center justify-center w-6 h-6 row-start-2 mr-2 text-sm text-right rounded-full z-1 text-grey-900 group bg-brightGray">
                    {char}
                </span>
            )}
            {name && <p>{name}</p>}
        </div>
    )
}

export default NotificationPreview

// import Priority from '_components/blocks/notificationElements/Priority'
// import Status from '_components/blocks/notificationElements/Status'
// import Title from '_components/blocks/notificationElements/Title'
// import Assigned from '_components/blocks/notificationElements/Assigned'
// import Close from '_components/blocks/icons/Close'

// import { capitalizeFirstLetter } from 'utils/helpers/stringHelpers'

// const STATUS = [
//     {
//         index: 6,
//         state: 'Moved to BiA QA',
//         date: '01-04-2022 — 10:22',
//     },
//     {
//         index: 5,
//         state: 'Moved to Mammut QA',
//         date: '01-04-2022 — 10:22',
//     },
//     {
//         index: 4,
//         state: 'Moved to Ready for release',
//         date: '01-04-2022 — 10:22',
//     },
//     {
//         index: 3,
//         state: 'Moved to Production',
//         date: '01-04-2022 — 10:22',
//     },
//     {
//         index: 2,
//         state: 'Currently in Progress',
//         date: '02-04-2022 — 9:32',
//     },
//     {
//         index: 1,
//         state: 'Reported on backlog',
//         date: '01-04-2022 — 10:22',
//     },
// ]

// const NotificationPreview = ({ data }) => {
//     const { assignedTo, priorityLevel, status, service, name, message, slug } =
//         data

//     const elements = [
//         {
//             label: 'Detected on',
//             value: 'Mammut',
//         },
//         {
//             label: 'Assigned to',
//             value: assignedTo ? assignedTo : 'Nobody',
//         },
//         {
//             label: 'Last updated',
//             value: '1h ago',
//         },
//         {
//             label: 'Priority level',
//             value: <Priority priority={priorityLevel} />,
//         },
//         {
//             label: 'Current status',
//             value: status,
//         },
//     ]

//     return (
//         <section className="relative w-full mt-10 overflow-y-scroll bg-white border rounded-lg shadow-md border-flashWhite">
//             <header className="sticky top-0 flex items-center justify-between px-8 py-4 text-sm bg-white rounded-t-lg shadow-sm">
//                 <p className="opacity-50">{`/ ${name} / ${slug}`}</p>
//                 <Close styles="w-18" />
//             </header>

//             <main className="px-8 py-4 pt-8">
//                 <section className="pb-4 mb-4 border-b-2 border-b-raisinBlack">
//                     <h3 className="mb-8 text-xl font-bold">{`${capitalizeFirstLetter(
//                         service,
//                     )} ${message}`}</h3>

//                     <article className="mb-4">
//                         {elements.map((item, i) => {
//                             return (
//                                 <div key={i} className="flex items-center mb-2">
//                                     <span className="w-[50%]">
//                                         <p className="text-[#808080]">
//                                             {item.label}
//                                         </p>
//                                     </span>
//                                     <span className="w-[50%]">
//                                         {item.value}
//                                     </span>
//                                 </div>
//                             )
//                         })}
//                     </article>
//                 </section>

//                 <section className="pb-4 mb-4 border-b-2 border-b-raisinBlack">
//                     <h3 className="mb-2 text-xl font-bold">Description</h3>

//                     <p>{capitalizeFirstLetter(message)}</p>
//                 </section>

//                 <section className="pb-4 mb-4 text-xs border-b-2 border-b-brightGray desktop:col-start-3 desktop:col-end-6">
//                     <h3 className="mb-2 text-xl font-bold">Error message</h3>

//                     <pre className="mb-8">
//                         Error appeared in: {data.specificCodeFile}
//                     </pre>

//                     {data.errorMessage?.length >= 1 ? (
//                         data.errorMessage.map((line, i) => {
//                             return (
//                                 <pre className="text-[10px]" key={i}>
//                                     {line}
//                                 </pre>
//                             )
//                         })
//                     ) : (
//                         <pre className="text-xs">no error message</pre>
//                     )}
//                 </section>

//                 <section className="w-full pb-4 mb-4 ">
//                     <h3 className="mb-2 text-xl font-bold">Changelog</h3>
//                     <ul className="flex flex-col overflow-y-auto ">
//                         {STATUS.map(({ state, date, index }, i) => {
//                             return (
//                                 <li
//                                     key={i}
//                                     className="flex justify-between text-sm"
//                                 >
//                                     <p>{state}</p>
//                                     <p>{date}</p>
//                                 </li>
//                             )
//                         })}
//                     </ul>
//                 </section>
//             </main>
//         </section>
//     )
// }

// export default NotificationPreview
