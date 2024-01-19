import { ItemEntity, ItemEntityValidationError } from '@/entites/item'
import { AuthenticationError, itemToDto, ValidationError, itemToCreateItemDtoMapper } from '@/use-cases/utils'
import { AddItem, CreateItem, GetUser, GetUserItemByName, UpdateItem } from '@/use-cases/types'

export async function addTierListItem(
	context: {
		addItem: AddItem
		getUser: GetUser
		createItem: CreateItem
		updateItem: UpdateItem
		getUserItemByName: GetUserItemByName
	},
	data: { name: string; quantity: number },
) {
	const user = context.getUser()

	if (!user) {
		throw new AuthenticationError()
	}

	const existingItem = await context.getUserItemByName(user.userId, data.name)

	if (existingItem) {
		const updatedItem = new ItemEntity({
			...existingItem,
			quantity: existingItem.quantity + data.quantity,
		})
		await context.updateItem(itemToDto(updatedItem))
		return
	}

	try {
		const newItem = new ItemEntity({
			quantity: data.quantity,
			name: data.name,
			userId: user.userId,
		})
		await context.createItem(itemToCreateItemDtoMapper(newItem))
	} catch (err) {
		const error = err as ItemEntityValidationError
		throw new ValidationError(error.getErrors())
	}
}
