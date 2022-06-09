const Notification = ({
    projectName = '',
    intro = '',
    pathName = '#',
    closeToast,
    ...props
}) => {
    return (
        <>
            <a href={pathName}>
                <h1>{projectName}</h1>
                <p>{intro}</p>
            </a>
            <p className="mb-2 text-2xl font-bold">hello?</p>
            <div className="flex justify-between">
                <a href="">View details</a>
                <button onClick={closeToast}>Close</button>
            </div>
        </>
    )
}

export default Notification
