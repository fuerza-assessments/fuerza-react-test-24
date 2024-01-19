import type { Metadata } from 'next'

import { Footer } from './footer'

export const metadata: Metadata = {
	title: 'Javascript Framework Stock Tracker',
	description: 'A stock tracker for frameworks',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<main className='grid grid-cols-3 p-12 gap-12 max-w-screen-xl w-full mx-auto'>{children}</main>
			<Footer />
		</>
	)
}
