'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { tv } from 'tailwind-variants'

const currentMenu = tv({
	base: 'font-versos hover:opacity-50',
	variants: {
		active: {
			true: 'underline font-bold opacity-80',
		},
	},
})

export const Menu = () => {
	const pathname = usePathname()

	const links = [
		{
			label: 'stock',
			path: '/dashboard',
		},
		{
			label: 'tier list',
			path: '/dashboard/tier-list',
		},
	]

	return (
		<nav className='ml-8 flex space-x-4'>
			{links.map(e => (
				<Link key={e.path} className={currentMenu({ active: e.path === pathname })} href={e.path}>
					{e.label}
				</Link>
			))}
		</nav>
	)
}
