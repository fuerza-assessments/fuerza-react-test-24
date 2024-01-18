import { type Metadata } from 'next'
import { getProviders } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { SignInButtons } from './sign-in-button'

export const metadata: Metadata = {
	title: 'Sign In',
}

export default async function SignIn() {
	const { getUser } = await auth()

	const user = getUser()

	if (user) {
		redirect('/')
	}

	const providers = await getProviders()

	return (
		<main className='min-h-screen relative flex items-center justify-center h-full bg-center bg-square-grid dark:bg-square-grid-dark'>
			<div className='relative bottom-16'>
				<div className='w-full space-y-4 text-center'>
					<SignInButtons providers={providers} />
				</div>
			</div>
		</main>
	)
}
