import {
    InstantSearch,
    SearchBox,
    Hits,
    Highlight,
} from 'react-instantsearch-dom'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

import { useOpenSearch, useSetOpenSearch } from '_utils/atoms/openSearch'

const searchClient = instantMeiliSearch(
    'https://integration-demos.meilisearch.com',
    'q7QHwGiX841a509c8b05ef29e55f2d94c02c00635f729ccf097a734cbdf7961530f47c47',
)

const Search = ({ data, onClick }) => {
    const openSearch = useOpenSearch()
    const setOpenSearch = useSetOpenSearch()

    const handleSearchClick = () => setOpenSearch(!openSearch)

    return (
        <main className="flex flex-col items-center h-full mt-60">
            <form className="min-w-[40vw] max-w-[1000px]">
                <fieldset className="flex p-4 bg-white rounded-lg">
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
            {/* <InstantSearch indexName={data} searchClient={searchClient}> */}
            {/* <SearchBox />
                <Hits hitComponent={Hit} /> */}
            {/* </InstantSearch> */}
        </main>
    )
}

const Hit = ({ hit }) => {
    console.log(hit)
    return (
        <div>
            <p>elem</p>
        </div>
    )
}

export default Search
