const Notification = (
    props,
    { projectName, shortDescription, pathName, closeToast },
) => {
    console.log(props)
    return (
        <>
            <a href={pathName}>
                <h1>{projectName}</h1>
                <p>{shortDescription}</p>
            </a>
            <div>
                <a href="">View details</a>
                <button onClick={closeToast}>Close</button>
            </div>
        </>
    )
}

export default Notification
