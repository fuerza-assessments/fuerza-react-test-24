'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cva } from 'class-variance-authority'

const currentMenu = cva(['text-red-fuerza'], {
	variants: {
		current: {},
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
