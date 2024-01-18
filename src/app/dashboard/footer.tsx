type Joke = {
	question: string
	punchline: string
}

type Response = Promise<Joke | Error>

const getJoke = async (): Response => {
	const url = 'https://backend-omega-seven.vercel.app/api/getjoke'
	const options = {
		method: 'GET',
		next: { revalidate: 600 },
	}

	try {
		const response = await fetch(url, options)
		const [joke] = response.json()
		return joke as Joke
	} catch (error) {
		return error as Error
	}
}

export const Footer = async () => {
	const response = await getJoke()

	if (response instanceof Error) {
		return null
	}

	return (
		<footer className='text-sm max-w-screen-xl mt-auto py-6 mx-auto w-full'>
			<div className='opacity-75'>
				<blockquote>{response.question}</blockquote>
				<blockquote>
					- <q>{response.punchline}</q>
				</blockquote>
			</div>
		</footer>
	)
}
