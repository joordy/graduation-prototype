import Link from 'next/link'
import { useRouter } from 'next/router'

import { supabase } from '_utils/database/init'
import { capitalizeFirstLetter } from '_utils/helpers/stringHelpers'

import SignOut from '_components/blocks/icons/SignOut'

const ProfileButton = ({ user, userData, toggledHeader }) => {
    const router = useRouter()

    function eraseCookie(name) {
        document.cookie = name + '=; Max-Age=0'
    }

    const onHandleSignOut = async (e) => {
        const { error: err } = await supabase.auth.signOut()

        localStorage.removeItem('supabase.auth.token')

        eraseCookie('sb-access-token')
        eraseCookie('sb-refresh-token')

        if (err) console.error(err)
        router.push('/sign-in')
    }

    return (
        <div
            className={`m-0 flex max-h-[100%] items-center   rounded-lg ${
                toggledHeader ? 'w-[48px] pl-0' : 'w-full pl-[0]'
            } duration-[250ms] ease-in hover:cursor-pointer hover:bg-slate-200`}
        >
            <Link href="/profile">
                <a>
                    <div
                        className={`relative flex w-full flex-row  items-center rounded-lg  p-2 text-sm`}
                    >
                        <span className="flex flex-col items-center justify-center w-6 h-6 p-4 text-white rounded-full stroke-grey-800 bg-slate-800">
                            {user?.user_metadata?.firstName
                                ? user?.user_metadata?.firstName.charAt(0)
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
                                {capitalizeFirstLetter(
                                    user?.user_metadata?.role
                                        ? user?.user_metadata.role
                                        : userData?.user_role,
                                )}
                            </p>
                        </div>
                    </div>
                </a>
            </Link>
            <button
                className="relative flex items-center h-full"
                onClick={onHandleSignOut}
            >
                <span className="pr-4">
                    <SignOut className="w-5 h-5 -rotate-90" />
                </span>
            </button>
        </div>
    )
}

export default ProfileButton
