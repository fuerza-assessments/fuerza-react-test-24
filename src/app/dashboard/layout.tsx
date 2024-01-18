import type { Metadata } from 'next'

import { Footer } from './footer'
import { CreateItemForm } from './create-item-form'

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
			<main className='grid grid-cols-3 p-12 gap-12 max-w-screen-xl w-full mx-auto'>
				{children}
				<div className='col-span-3 md:col-span-1'>
					<CreateItemForm />
				</div>
			</main>
			<Footer />
		</>
	)
}
