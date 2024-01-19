export type ItemDto = {
	id: number
	name: string
	quantity: number
	userId: string
	isLow: boolean
}

export type CreateItemDto = {
	name: string
	userId: string
	quantity: number
}

export type User = {
	userId: string
}

export type TierItemDto = {
	id: number
	name: string
	position: number
	userId: string
}

export type CreateTierItemDto = {
	name: string
	userId: string
	position: number
}

export type CreateTierItem = (item: CreateTierItemDto) => void
export type GetUserTierListItem = ({ userId, name, position }: { userId: string; name: string; position: number }) => Promise<TierItemDto | undefined>

export type CreateItem = (item: CreateItemDto) => void
export type DeleteItem = (itemId: number) => void
export type UpdateItem = (item: ItemDto) => void
export type GetUser = () => User | undefined
export type GetItem = (itemId: number) => Promise<ItemDto>
export type GetUserItemByName = (userId: string, name: string) => Promise<ItemDto | undefined>
