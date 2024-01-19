import { getRankListItems } from '@/data-access/rank-list/get-items.persistence'
import { AddItemForm } from './rank-form'
import { RankTable } from './rank-table'

export default async function RankList() {
	const items = await getRankListItems()

	return (
		<>
			<div className='col-span-3 md:col-span-2'>
				<h1 className='text-4xl mb-8'>rank List</h1>
				<RankTable items={items} />
			</div>
			<div className='col-span-3 md:col-span-1'>
				<AddItemForm />
			</div>
		</>
	)
}
