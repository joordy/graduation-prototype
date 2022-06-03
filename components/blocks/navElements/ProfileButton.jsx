import Link from 'next/link'

import { capitalizeFirstLetter } from '_utils/helpers/stringHelpers'

const ProfileButton = ({ user, userData, toggledHeader }) => {
    return (
        <Link href="/profile">
            <a
                // 'm-0 flex max-h-[100%] flex-col overflow-hidden duration-[250ms] ease-in ' +
                className={' ' + (toggledHeader ? 'w-[48px]' : 'w-[inherit]')}
            >
                <div className="flex items-center">
                    <span className="stroke-grey-800 text-body my-[8px] mx-[10px] flex h-[32px] w-[32px] flex-col items-center justify-center  rounded-full bg-raisinBlack font-bold text-white ">
                        {user?.user_metadata.firstName
                            ? user?.user_metadata.firstName.charAt(0)
                            : userData?.firstName?.charAt(0)}
                        {user?.user_metadata.lastName
                            ? user?.user_metadata.lastName.charAt(0)
                            : userData?.lastName?.charAt(0)}
                    </span>

                    <div>
                        <p className="text-body ml-2 w-max min-w-[125px] overflow-hidden">
                            {user?.user_metadata.firstName
                                ? user?.user_metadata.firstName
                                : userData?.firstName}
                        </p>
                        <p className="text-grey-700 ml-2 w-max min-w-[125px] overflow-hidden text-xs">
                            {capitalizeFirstLetter(user?.user_metadata.role)}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default ProfileButton
