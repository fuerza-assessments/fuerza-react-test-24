import { AddItemForm } from './tier-form'
import { TierTable } from './tier-table'

export default async function Dashboard() {
	const lowItems = [
		{
			id: 1,
			name: 'Teste',
			position: 1,
		},
		{
			id: 2,
			name: 'Teste 2',
			position: 2,
		},
	]

	return (
		<>
			<div className='col-span-3 md:col-span-2'>
				<h1 className='text-4xl mb-8'>Tier List</h1>
				<TierTable items={lowItems} />
			</div>
			<div className='col-span-3 md:col-span-1'>
				<AddItemForm />
			</div>
		</>
	)
}
