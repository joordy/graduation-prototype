import { useState, useMemo } from 'react'
import {
    InstantSearch,
    SearchBox,
    Hits,
    Highlight,
} from 'react-instantsearch-dom'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

import { useOpenSearch, useSetOpenSearch } from '_utils/atoms/openSearch'
import { NOTIFICATION_DATA } from '_utils/database/dataset'

import NotificationElement from '_components/blocks/NotificationElement'

const searchClient = instantMeiliSearch(
    'https://integration-demos.meilisearch.com',
    'q7QHwGiX841a509c8b05ef29e55f2d94c02c00635f729ccf097a734cbdf7961530f47c47',
)

const Search = ({ data, onClick }) => {
    const openSearch = useOpenSearch()
    const setOpenSearch = useSetOpenSearch()

    const handleSearchClick = () => setOpenSearch(!openSearch)

    const [value, setValue] = useState('')
    const results = useMemo(() => {
        const searchStr = value.toLowerCase()

        return NOTIFICATION_DATA.filter((obj) => {
            const nameStr = obj.projectName.toLowerCase()
            const descStr = obj.intro.toLowerCase()

            const resultsName = nameStr.includes(searchStr)
            const resultsDesc = descStr.includes(searchStr)

            if (resultsName || resultsDesc) {
                return obj
            }

            return
        })
    }, [value])

    const validSearch = value.length >= 1

    return (
        <main className="flex flex-col items-center h-full mt-60">
            <form className="min-w-[40vw] max-w-[1000px]">
                <fieldset className="flex p-4 bg-white ">
                    <label className="flex items-center justify-center pr-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </label>
                    <input
                        className="w-full p-2"
                        type="text"
                        placeholder="Mammut, Foam, Aubade...."
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <button
                        className="flex items-center justify-center pl-4"
                        onClick={onClick}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </fieldset>
            </form>
            <div className="min-w-[40vw] max-w-[1000px]">
                <ul>
                    {!value.length >= 1 ? (
                        <NoValidSearch />
                    ) : results.length >= 1 ? (
                        <Results results={results} />
                    ) : (
                        <NoResults />
                    )}
                    {/* {validSearch ? (
                        results.length >= 1 ? (
                            results.map((hit, i) => {
                                return (
                                    <NotificationElement
                                        key={i}
                                        slug={hit.slug}
                                        projectName={hit.projectName}
                                        projectIcon={hit.projectIcon}
                                        intro={hit.intro}
                                    />
                                )
                            })
                        ) : (
                            <p>no results</p>
                        )
                    ) : (
                        <p>no results</p>
                    )}

                    {/* {results.length >= 1 ? (
                        results.map((hit, i) => {
                            return (
                                <Notification
                                    key={i}
                                    slug={hit.slug}
                                    projectName={hit.projectName}
                                    projectIcon={hit.projectIcon}
                                    intro={hit.intro}
                                />
                            )
                        })
                    ) : (
                        <p>no results</p>
                    )} *
                    */}
                </ul>
            </div>
        </main>
    )
}

const NoResults = () => {
    return <p>no results</p>
}

const NoValidSearch = () => {
    return <p>Please type a query</p>
}

const Results = ({ results = [] }) => {
    return results.map((data, i) => {
        return <NotificationElement key={i} hit={hit} />
    })
}

export default Search
