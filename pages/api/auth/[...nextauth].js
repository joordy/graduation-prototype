import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GitlabProvider from 'next-auth/providers/gitlab'
import GoogleProvider from 'next-auth/providers/google'

import { FirebaseAdapter } from '@next-auth/firebase-adapter'
import * as firestoreFunctions from 'firebase/firestore'

import { db } from '_utils/database/firebase'

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    secret: process.env.SECRET_KEY,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin',
    },
    callbacks: {
        async session({ session, token, user }) {
            session.user.username = session.user.name
                .split(' ')
                .join('')
                .toLocaleLowerCase()
            session.user.uid = token.sub

            return session
        },
    },
    adapter: FirebaseAdapter({
        db: db,
        ...firestoreFunctions,
    }),
})
