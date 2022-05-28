import Link from 'next/link'

const ProfileButton = ({ user, userData, toggledHeader }) => {
    return (
        <Link href="/profile">
            <a
                // 'm-0 flex max-h-[100%] flex-col overflow-hidden duration-[250ms] ease-in ' +
                className={' ' + (toggledHeader ? 'w-[48px]' : 'w-[inherit]')}
            >
                <div className="flex items-center ml-2">
                    <span className="flex flex-col items-center justify-center w-8 h-8 p-1 m-1 text-xs text-white rounded-full bg-grey-900 stroke-grey-800 ">
                        {user?.user_metadata.firstName
                            ? user?.user_metadata.firstName.charAt(0)
                            : userData?.firstName?.charAt(0)}
                        {user?.user_metadata.lastName
                            ? user?.user_metadata.lastName.charAt(0)
                            : userData?.lastName?.charAt(0)}
                    </span>

                    <div>
                        <p className="ml-2 w-max min-w-[125px] overflow-hidden">
                            {user?.user_metadata.firstName
                                ? user?.user_metadata.firstName
                                : userData?.firstName}
                        </p>
                        <p className="text-grey-700 ml-2 w-max min-w-[125px] overflow-hidden text-xs">
                            {user?.user_metadata?.role &&
                                capitalizeFirstLetter(
                                    user?.user_metadata?.role,
                                )}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default ProfileButton
