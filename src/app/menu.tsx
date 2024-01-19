'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { tv } from 'tailwind-variants'

const currentMenu = tv({
	base: 'font-medium bg-blue-500 text-white rounded-full active:opacity-80',
	variants: {
		active: {
			true: 'underline',
		},
	},
})

export const Menu = () => {
	const pathname = usePathname()
	return (
		<nav className='ml-8 flex space-x-4'>
			{pathname}
			<Link className={currentMenu()} href='/dashboard'>
				stock
			</Link>
			<Link className={currentMenu()} href='/dashboard/tier-list'>
				tier-list
			</Link>
		</nav>
	)
}
