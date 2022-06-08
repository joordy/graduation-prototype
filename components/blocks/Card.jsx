const Card = ({ tag = 'p', children, ...props }) => {
    const El = tag || 'h2'

    return (
        <El
            className="px-4 py-3 duration-75 ease-in shadow-md hover: bg-offWhite hover:bg-flashWhite rounded-xl hover:cursor-pointer"
            {...props}
        >
            {children}
        </El>
    )
}

export default Card
