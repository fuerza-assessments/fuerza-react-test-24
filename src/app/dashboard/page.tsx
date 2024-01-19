import { ItemsTable } from './items-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getItems } from '@/data-access/items/get-items.persistence'
import { partition } from 'lodash'
import { CreateItemForm } from './create-item-form'

export default async function Dashboard() {
	const items = await getItems()

	const [outOfItems, itemsInStock] = partition(items, item => item.quantity === 0)
	const [lowItems, normalItems] = partition(itemsInStock, item => item.isLow)

	return (
		<>
			<div className='col-span-3 md:col-span-2'>
				<h1 className='text-4xl mb-8'>Stock</h1>

				<Tabs defaultValue='items'>
					<TabsList className='grid w-full grid-cols-3'>
						<TabsTrigger value='items'>In Stock ({normalItems.length})</TabsTrigger>
						<TabsTrigger value='low'>Running Low ({lowItems.length})</TabsTrigger>
						<TabsTrigger value='out'>Out of Stock ({outOfItems.length})</TabsTrigger>
					</TabsList>
					<TabsContent value='items'>
						<ItemsTable items={normalItems} />
					</TabsContent>
					<TabsContent value='low'>
						<ItemsTable items={lowItems} />
					</TabsContent>
					<TabsContent value='out'>
						<ItemsTable items={outOfItems} />
					</TabsContent>
				</Tabs>
			</div>
			<div className='col-span-3 md:col-span-1'>
				<CreateItemForm />
			</div>
		</>
	)
}
