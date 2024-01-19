import { RankItemEntity, RankItemEntityValidationError } from '@/entites/rank-item'
import { AuthenticationError, ValidationError, tierListItemToCreateItemDtoMapper } from '@/use-cases/utils'
import type { GetUser, CreateRankItem, GetUserRankListItem } from '@/use-cases/types'

type RankItem = {
	name: string
	position: number
}

type CTX = {
	createRankListItem: CreateRankItem
	getRankListItem: GetUserRankListItem
	getUser: GetUser
}

export async function addRankListItem(ctx: CTX, data: RankItem) {
	const user = ctx.getUser()

	if (!user) {
		throw new AuthenticationError()
	}

	const existingRankListItem = await ctx.getRankListItem({
		userId: user.userId,
		name: data.name,
		position: data.position,
	})

	if (existingRankListItem) {
		const tierListItem = new RankItemEntity(existingRankListItem)

		if (tierListItem.getPosition() === data.position && tierListItem.getName() === data.name) {
			throw new Error('Item already exist!')
		}

		if (tierListItem.getName() === data.name) {
			throw new Error(
				`The item you are trying to add, named ${data.name}, already exists in the rank list. It is currently placed in rank ${tierListItem.getPosition()}.`,
			)
		}

		if (tierListItem.getPosition() === data.position) {
			throw new Error(`The position you are trying to assign to this item is already occupied by ${tierListItem.getName()}`)
		}
	}

	try {
		const newRankItem = new RankItemEntity({ position: data.position, name: data.name, userId: user.userId })
		await ctx.createRankListItem(tierListItemToCreateItemDtoMapper(newRankItem))
	} catch (err) {
		const error = err as RankItemEntityValidationError
		throw new ValidationError(error.getErrors())
	}
}
