import Link from 'next/link'

import { useUserIsAuthenticated } from '_utils/atoms/userIsAuthenticated'
import { useUserData } from '_utils/atoms/userData'

const Sidebar = () => {
    const authenticated = useUserIsAuthenticated()
    const userData = useUserData()

    console.log('authenticated', authenticated)
    return (
        <nav className="fixed w-52 h-screen p-11 flex flex-col justify-between items-center ">
            <button>Resize!</button>

            <ul>
                <li>
                    <span>X</span>
                    <span>Mammut</span>
                </li>
                <li>
                    <Link href="/">
                        <a style={linkStyle}>Home</a>
                    </Link>
                </li>

                {!authenticated && (
                    <li>
                        <Link href="/sign-in">
                            <a style={linkStyle}>Sign In</a>
                        </Link>
                    </li>
                )}
                <li>
                    <Link href="/protected">
                        <a style={linkStyle}>Protected</a>
                    </Link>
                </li>
            </ul>

            {userData && (
                <Link href="/profile">
                    <a>{userData.user_metadata.name}</a>
                </Link>
            )}
        </nav>
    )
}

const linkStyle = {
    marginRight: 10,
}

export default Sidebar
