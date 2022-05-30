const Card = ({ tag = 'p', children, ...props }) => {
    const El = tag || 'h2'

    return (
        <El
            className="px-4 py-3 duration-75 ease-in shadow-md hover: rounded-xl bg-offWhite hover:cursor-pointer hover:bg-flashWhite"
            {...props}
        >
            {children}
        </El>
    )
}

export default Card
