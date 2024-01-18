import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { Header } from './header'
import { ContextProvider } from './context-provider'

import localFont from 'next/font/local'

const versos = localFont({
	variable: '--font-versos',
	display: 'swap',
	src: [
		{
			path: '../../public/fonts/VersosVariable.woff',
		},
	],
})

const inter = Inter({ subsets: ['latin'] })

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
		<html lang='en' suppressHydrationWarning>
			<body className={` ${inter.className} ${versos.variable} antialiased`}>
				<ContextProvider>
					<div className='px-4 flex flex-col min-h-screen'>
						<Header />
						{children}
					</div>
					<Toaster />
				</ContextProvider>
			</body>
		</html>
	)
}
