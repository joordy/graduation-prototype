import Link from 'next/link'

import { capitalizeFirstLetter } from '_utils/helpers/stringHelpers'

const ProfileButton = ({ user, userData, toggledHeader }) => {
    return (
        <Link href="/profile">
            <a
                className={`m-0 flex max-h-[100%] items-center overflow-hidden rounded-lg ${
                    toggledHeader ? 'w-[48px] pl-0' : 'w-full pl-[0]'
                } duration-[250ms] ease-in hover:cursor-pointer hover:bg-brightGray`}
            >
                <div
                    className={`relative flex w-full flex-row  items-center rounded-lg  p-2 text-sm`}
                >
                    <span className="flex flex-col items-center justify-center w-6 h-6 p-4 text-white rounded-full stroke-grey-800 bg-raisinBlack">
                        {user?.user_metadata.firstName
                            ? user?.user_metadata.firstName.charAt(0)
                            : userData?.firstName?.charAt(0)}
                        {user?.user_metadata.lastName
                            ? user?.user_metadata.lastName.charAt(0)
                            : userData?.lastName?.charAt(0)}
                    </span>

                    <div>
                        <p className="text-body ml-2 w-max min-w-[125px] overflow-hidden font-medium">
                            {user?.user_metadata.firstName
                                ? user?.user_metadata.firstName
                                : userData?.firstName}
                        </p>
                        <p className="text-grey-700 ml-2 w-max min-w-[125px] overflow-hidden  text-xs font-extralight">
                            {capitalizeFirstLetter(user?.user_metadata.role)}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default ProfileButton
