const Priority = ({ priority = 'urgent' }) => {
    return (
        <span
            className={
                'col-start-1 row-start-2 flex h-[20px] w-fit flex-col items-center justify-center rounded-md  px-2 text-xs text-white ' +
                (priority == 1
                    ? 'bg-[red]'
                    : priority == 2
                    ? 'bg-[orange]'
                    : 'bg-raisinBlack')
            }
        >
            {priority == 1 ? 'High' : priority == 2 ? 'Medium' : 'Low'}
        </span>
    )
}

export default Priority
