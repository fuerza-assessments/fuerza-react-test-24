import 'server-only'

import { db } from '@/db'
import { type TierItem, tierList } from '@/db/schema'
import { eq, or, and } from 'drizzle-orm'
import { TierItemDto } from '@/use-cases/types'

export function toDtoMapper(item: TierItem) {
	return {
		id: item.id,
		name: item.name,
		position: item.position,
		userId: item.userId,
	}
}

type GetTierListItemProps = {
	userId: string
	name: string
	position: number
}

export async function getTierListItem({ userId, name, position }: GetTierListItemProps): Promise<TierItemDto> {
	const foundTierListItem = await db.query.tierList.findFirst({
		where: and(eq(tierList.userId, userId), or(eq(tierList.position, position), eq(tierList.name, name))),
	})

	if (!foundTierListItem) {
		throw new Error('could not find tier list item')
	}

	return toDtoMapper(foundTierListItem)
}
