import { getProviders, getSession, signIn } from 'next-auth/react'

export default function SignInPage({ providers }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-2xl font-bold">
            <p>This is the signin page!</p>

            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button
                        className="flex w-auto h-auto p-4 mt-10 bg-blue-500 rounded-lg focus:outline-none"
                        onClick={() =>
                            signIn(provider.id, { callbackUrl: '/' })
                        }
                    >
                        Log in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

// server side
export async function getServerSideProps(ctx) {
    const providers = await getProviders()
    const user = await getSession(ctx)

    if (user) {
        return { props: {}, redirect: { destination: '/profile' } }
    }

    return {
        props: { providers },
    }
}
// import { useState } from 'react'

// import { supabase } from '_utils/database/init'
// import { useUser, useSetUser } from '_utils/atoms/user'

// import {
//     useSession,
//     getSession,
//     signIn,
//     signOut,
//     getProviders,
// } from 'next-auth/react'

// const SignInPage = ({ providers = {}, ...props }) => {
//     console.log(providers)
//     const [data, setData] = useState({ email: '', password: '' })

//     const { data: session } = useSession()

// const handleSignin = (e) => {
//     e.preventDefault()
//     signIn()
// }
//     const handleSignout = (e) => {
//         e.preventDefault()
//         signOut()
//     }

//     return (
//         <section className="flex flex-col items-center justify-center w-screen h-screen bg-grey-50">
//             <p>test</p>
//             <>
//                 {/* {Object.values(providers).map((provider) => (
//                     <div key={provider.name}>
//                         <button onClick={() => signIn(provider.id)}>
//                             Sign in with {provider.name}
//                         </button>
//                     </div>
//                 ))} */}
//             </>
//         </section>
//         // <section className="flex flex-col items-center justify-center w-screen h-screen bg-grey-50">
//         //     <div>hi</div>
//         //     <form className="px-4 py-8 bg-white rounded-lg">
//         //         <fieldset className="flex flex-col">
//         //             <label className="flex flex-col">
//         //                 <span>Email</span>
//         //                 <input
//         //                     className="w-64 p-2 my-2 border rounded-md"
//         //                     type="email"
//         //                     placeholder="john.doe@mail.com"
//         //                     value={data.email}
//         //                     onChange={(e) =>
//         //                         setData({ ...data, email: e.target.value })
//         //                     }
//         //                 />
//         //             </label>

//         //             <input
//         //                 className="w-64 p-2 my-2 bg-white border-2 rounded-md border-grey-900 text-grey-900"
//         //                 type="submit"
//         //             />
//         //             <button
//         //                 className="w-64 p-2 my-2 bg-white border-2 rounded-md border-grey-900 text-grey-900"
//         //                 onClick={handleSignin}
//         //             >
//         //                 Or sign in with Github
//         //             </button>
//         //         </fieldset>
//         //     </form>
//         // </section>
//     )
//     // // const userData = useUser()
//     // // const setUserData = useSetUser()

//     // const [loading, setLoading] = useState(false)
//     // const [email, setEmail] = useState('')
//     // const [errorMessage, setErrorMessage] = useState(false)
//     // const [message, setMessage] = useState(false)

//     // // const handleGoogleAuth = async () => {
//     // //     const { user, session, error } = await supabase.auth.signIn({
//     // //         provider: 'google',
//     // //     })
//     // //     if (error) console.log(error)
//     // //     setUserData(user)
//     // //     return { user, session, error }
//     // // }

//     // // const handleLogin = async (email) => {
//     // //     const { user, error } = await supabase.auth.signIn({
//     // //         email: email,
//     // //     })
//     // //     if (error) console.log(error)

//     // //     setMessage('Check your email for the login link!')
//     // // }

//     // const handleClick = (e) => {
//     //     e.preventDefault()
//     //     console.log(data)
//     // }
//     // const { data: session } = useSession()
//     // if (session) {
//     //     return (
//     //         <>
//     //             Signed in as {session.user.email} <br />
//     //             <button onClick={() => signOut()}>Sign out</button>
//     //         </>
//     //     )
//     // }
//     // return (
//     //     <>
//     //         Not signed in <br />
//     //         <button onClick={() => signIn()}>Sign in</button>
//     //     </>
//     // )
//     // return (
//     //     <div className="flex flex-col items-center justify-center w-screen h-screen bg-grey-100">
//     //         <div className="flex bg-white">
//     //             <form
//     //                 className="flex w-[400px] flex-col items-center justify-center rounded-md p-5"
//     //                 onSubmit={handleClick}
//     //             >
//     //                 <fieldset>
//     //                     <label>
//     //                         <span>Email</span>
//     //                         <input
//     //                             className="w-full p-2 my-2 border rounded-md"
//     //                             type="email"
//     //                             placeholder="john.doe@mail.com"
//     //                             value={data.email}
//     //                             onChange={(e) =>
//     //                                 setData({ ...data, email: e.target.value })
//     //                             }
//     //                         />
//     //                     </label>

//     //                     <input
//     //                         className="w-full p-2 my-2 bg-white border-2 rounded-md border-grey-900 text-grey-900"
//     //                         type="submit"
//     //                     />
//     //                 </fieldset>
//     //             </form>
//     //         </div>
//     //     </div>
//     // )
// }

// export async function getServerSideProps(ctx) {
//     const providers = await getProviders(ctx)
//     console.log('Providers', providers)

//     // const user = await getSession(ctx)

//     // if (user) {
//     //     return { props: {}, redirect: { destination: '/profile' } }
//     // }
//     // const { user } = await supabase.auth.api.getUserByCookie(req)

//     // if (user) {
//     // return { props: {}, redirect: { destination: '/profile' } }
//     // }

//     // return { props: { userData: user } }
//     return {
//         props: { providers },
//     }
// }

// export default SignInPage
