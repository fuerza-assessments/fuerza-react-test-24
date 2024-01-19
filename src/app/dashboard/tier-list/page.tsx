import { getTierListItems } from '@/data-access/tier-list/get-items.persistence'
import { AddItemForm } from './tier-form'
import { TierTable } from './tier-table'

export default async function TierList() {
	const items = await getTierListItems()

	return (
		<>
			<div className='col-span-3 md:col-span-2'>
				<h1 className='text-4xl mb-8'>Tier List</h1>
				<TierTable items={items} />
			</div>
			<div className='col-span-3 md:col-span-1'>
				<AddItemForm />
			</div>
		</>
	)
}
