import { ItemEntity } from '@/entites/item'
import { AuthenticationError, itemToDto } from './utils'
import type { GetUser, UpdateItem, GetItem } from './types'

export async function unmarkAsLowUseCase(
	context: {
		getUser: GetUser
		updateItem: UpdateItem
		getItem: GetItem
	},
	data: { itemId: number },
) {
	const user = context.getUser()

	if (!user) {
		throw new AuthenticationError()
	}

	const dataItem = await context.getItem(data.itemId)
	const item = new ItemEntity(dataItem)
	item.unmarkAsLow()

	context.updateItem(itemToDto(item))

	return itemToDto(item)
}
