const Card = ({ tag = 'p', children, ...props }) => {
    const El = tag || 'h2'

    return (
        <El
            className="rounded-xl bg-grey-50 px-4 py-3 shadow-md duration-75 ease-in hover:cursor-pointer hover:bg-[rgb(228,228,228)]"
            {...props}
        >
            {children}
        </El>
    )
}

export default Card
