const Priority = ({ priority = 1, styles }) => {
    return (
        <span
            className={
                styles +
                ' col-start-1 row-start-2 flex h-[20px] w-fit flex-col items-center justify-center rounded-md  px-2 text-xs font-medium  ' +
                (priority == 1
                    ? 'bg-[#cf0303] text-[#f0f0f0]'
                    : priority == 2
                    ? 'bg-[#ff7f00] text-white'
                    : 'bg-[#444444] text-white')
            }
        >
            {priority == 1 ? 'High' : priority == 2 ? 'Medium' : 'Low'}
        </span>
    )
}

export default Priority
