import Link from 'next/link'

export const Menu = () => {
	return (
		<nav className='ml-8 flex space-x-4'>
			<Link href='/dashboard'>stock</Link>
			<Link href='/dashboard/tier-list'>tier-list</Link>
		</nav>
	)
}
