'use client'

import { type Metadata } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
	title: 'Sign In',
}

export const SignInButtons = ({ providers }: { providers: Awaited<ReturnType<typeof getProviders>> }) => {
	if (!providers) {
		return null
	}
	return (
		<>
			{Object.values(providers).map(provider => (
				<div key={provider.name}>
					<Button
						onClick={() => signIn(provider.id)}
						className='rounded-md bg-red-fuerza px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Sign in with {provider.name}
					</Button>
				</div>
			))}
		</>
	)
}
