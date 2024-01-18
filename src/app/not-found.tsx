import { Boundary } from '@/components/ui/boundary'

export default function NotFound() {
	return (
		<Boundary>
			<div className='space-y-4'>
				<h2 className='text-lg font-bold'>Not Found</h2>
				<p className='text-sm'>Could not find requested resource</p>
			</div>
		</Boundary>
	)
}
