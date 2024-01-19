'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const Menu = () => {
	const pathname = usePathname()
	return (
		<nav className='ml-8 flex space-x-4'>
			{pathname}
			<Link href='/dashboard'>stock</Link>
			<Link href='/dashboard/tier-list'>tier-list</Link>
		</nav>
	)
}
