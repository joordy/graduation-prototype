const Assigned = ({ assignedTo }) => {
    return (
        <p className="absolute flex flex-col items-center justify-center w-6 h-6 row-start-2 text-sm text-right rounded-full z-1 text-grey-900 group -right-1 -bottom-1 bg-brightGray">
            {assignedTo ? assignedTo.charAt(0) : '—'}
            <span
                className={
                    'invisible absolute bottom-5 right-0 z-10 -ml-6 w-36 rounded-md bg-[#555] px-1 py-2 text-center text-xs text-white opacity-0 duration-200 ease-in ' +
                    'after:top:[50%] after:border-grey-600 after:absolute after:right-0 after:-ml-[5px] after:border-2 after:border-solid after:content-none ' +
                    'group-hover:visible group-hover:opacity-100'
                }
            >
                Assigned to: {assignedTo ? assignedTo : 'Nobody'}
            </span>
        </p>
    )
}

export default Assigned
