import { db } from '@/db'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import { AuthOptions, DefaultSession, getServerSession } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import Auth0Provider from 'next-auth/providers/auth0'

import { env } from '@/env'

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id: string
		} & DefaultSession['user']
	}
}

export const authConfig = {
	adapter: DrizzleAdapter(db) as AuthOptions['adapter'],
	session: {
		strategy: 'jwt',
	},
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_ID,
			clientSecret: env.GOOGLE_SECRET,
		}),
		GithubProvider({
			clientId: env.GITHUB_ID,
			clientSecret: env.GITHUB_SECRET,
			authorization: 'https://github.com/login/oauth/authorize?scope=read:user+user:email+read:org',
			userinfo: {
				url: 'https://api.github.com/user',
				async request({ client, tokens }) {
					const profile = await client.userinfo(tokens.access_token ?? '')
					return profile
				},
			},
		}),
		Auth0Provider({
			clientId: env.AUTH0_CLIENT_ID,
			clientSecret: env.AUTH0_CLIENT_SECRET,
			issuer: env.AUTH0_ISSUER,
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			const dbUser = await db.query.users.findFirst({
				where: (users, { eq }) => eq(users.email, token.email || ''),
			})

			if (!dbUser) {
				throw new Error('no user with email found')
			}

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				picture: dbUser.image,
			}
		},
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id as string
				session.user.name = token.name
				session.user.email = token.email
				session.user.image = token.picture
			}

			return session
		},
	},
	pages: {
		signIn: '/sign-in',
		signOut: '/sign-in',
	},
} satisfies AuthOptions

// Use it in server contexts
export async function auth(...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []) {
	const session = await getServerSession(...args, authConfig)
	return { getUser: () => session?.user && { userId: session.user.id, name: session.user.name } }
}
