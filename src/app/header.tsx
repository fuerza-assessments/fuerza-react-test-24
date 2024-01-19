import { ModeToggle } from './theme-toggle'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'

const MenuComponent = async () => {
	const { getUser } = await auth()
	const user = getUser()

	if (!user) {
		return null
	}

	return (
		<nav className='ml-8 flex space-x-4'>
			<Link href='/dashboard'>stock</Link>
			<Link href='/api/auth/signout'>tier-list</Link>
		</nav>
	)
}

export async function Header() {
	const { getUser } = await auth()
	const user = getUser()

	const Menu = user ? <></> : null

	return (
		<div className='border-b py-4'>
			<div className='container mx-auto flex items-center'>
				<Link href='/' className='flex gap-1 items-center text-xl'>
					<Image src='/logo.png' width='50' height='50' alt='Stock tracker logo' />
				</Link>

				<MenuComponent />
				<div className='ml-auto flex justify-between gap-4'>
					<ModeToggle />

					{user ? (
						<Link href='/api/auth/signout'>
							<Button>Sign Out</Button>
						</Link>
					) : (
						<Link href='/api/auth/signin/'>
							<Button>Sign In</Button>
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}
