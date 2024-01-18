import clsx from 'clsx'
import React from 'react'

type BoundaryProps = {
	children: React.ReactNode
}

export const Boundary = ({ children }: BoundaryProps) => {
	return (
		<div className={clsx('p-4 lg:p-9 relative rounded-lg border border-dashed border-gray-700 text-vercel-pink animate-[rerender_1s_ease-in-out_1]')}>
			{children}
		</div>
	)
}
