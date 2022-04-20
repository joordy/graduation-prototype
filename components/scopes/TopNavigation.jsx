import { useToggleHeader, useSetToggleHeader } from '_utils/atoms/toggleHeader'
import { useOpenSearch, useSetOpenSearch } from '_utils/atoms/openSearch'

import HeaderButton from '_components/blocks/HeaderButton'
import Breadcrumbs from '_components/blocks/Breadcrumbs'

const TopNavigation = ({ breadCrumbs = false }) => {
    const toggledHeader = useToggleHeader()
    const setToggledHeader = useSetToggleHeader()
    const openSearch = useOpenSearch()
    const setOpenSearch = useSetOpenSearch()

    const handleSearchClick = () => setOpenSearch(!openSearch)
    const toggle = () => setToggledHeader(!toggledHeader)

    return (
        <header
            className={`mb-8 flex  items-center bg-white p-4 md:bg-transparent md:p-0 ${
                breadCrumbs ? 'justify-between' : 'justify-end'
            }`}
        >
            <button
                onClick={toggle}
                href="#"
                className={`
            md:hidden 
            ${toggledHeader && 'left-[1.2rem] top-[5rem]'}
        `}
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
                        d="M4 6h16M4 12h16M4 18h7"
                    />
                </svg>
            </button>

            {breadCrumbs && (
                <div className="flex flex-col items-center justify-center">
                    <Breadcrumbs />
                </div>
            )}

            <div className="flex items-center justify-center ">
                <HeaderButton href={'/notifications'}>
                    {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg> */}
                    N
                </HeaderButton>

                <HeaderButton onClick={handleSearchClick}>
                    {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
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
                    </svg> */}
                    S
                </HeaderButton>
            </div>
        </header>
    )
}
export default TopNavigation
