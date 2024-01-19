import { TierItemEntity, TierItemEntityValidationError } from '@/entites/tier-item'
import { AuthenticationError, ValidationError, tierListItemToCreateItemDtoMapper } from '@/use-cases/utils'
import type { GetUser, CreateTierItem, GetUserTierListItem } from '@/use-cases/types'

type TierItem = {
	name: string
	position: number
}

type CTX = {
	createTierListItem: CreateTierItem
	getTierListItem: GetUserTierListItem
	getUser: GetUser
}

export async function addTierListItem(ctx: CTX, data: TierItem) {
	const user = ctx.getUser()

	if (!user) {
		throw new AuthenticationError()
	}

	const existingTierListItem = await ctx.getTierListItem({
		userId: user.userId,
		name: data.name,
		position: data.position,
	})

	if (existingTierListItem) {
		const tierListItem = new TierItemEntity(existingTierListItem)

		if (tierListItem.getPosition() === data.position && tierListItem.getName() === data.name) {
			throw new Error('Tier item already exist!')
		}
		if (tierListItem.getPosition() === data.position) {
			return 'Position already exist!'
		}

		if (tierListItem.getName() === data.name) {
			return 'Name already exist!'
		}
	}

	try {
		const newTierItem = new TierItemEntity({ position: data.position, name: data.name, userId: user.userId })
		await ctx.createTierListItem(tierListItemToCreateItemDtoMapper(newTierItem))
	} catch (err) {
		const error = err as TierItemEntityValidationError
		throw new ValidationError(error.getErrors())
	}
}
