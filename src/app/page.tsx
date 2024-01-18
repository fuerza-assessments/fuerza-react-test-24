import Link from 'next/link'

export default async function Page() {
	return (
		<main className='flex  flex-col items-center justify-between p-12'>
			<div className='mx-auto max-w-3xl py-32 sm:py-48 lg:py-56'>
				<div className='text-center font-versos'>
					<h1 className='text-white text-4xl text-pretty font-light tracking-tight sm:text-6xl'>
						Manage the your stock of modern <b className='font-black'>Javascript Frameworks</b>
					</h1>
					<p className='mt-6 text-lg leading-8 text-slate-200'>Effortless Stock Management for the modern Javascript Developer</p>
					<div className='mt-10 flex items-center justify-center gap-x-6'>
						<Link
							href='/dashboard'
							className='rounded-md bg-red-fuerza px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Get started
						</Link>
					</div>
				</div>
			</div>
		</main>
	)
}
