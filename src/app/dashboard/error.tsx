'use client'

import { Boundary } from '@/components/ui/boundary'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

const ErrorComponent = ({ error, reset }: { error: Error; reset: () => void }) => {
	useEffect(() => {
		console.log('logging error:', error)
	}, [error])

	return (
		<Boundary>
			<div className='space-y-4'>
				<h2 className='text-lg font-bold'>Error</h2>
				<p className='text-sm'>{error?.message}</p>
				<div>
					<Button onClick={() => reset()}>Try Again</Button>
				</div>
			</div>
		</Boundary>
	)
}

export default ErrorComponent
