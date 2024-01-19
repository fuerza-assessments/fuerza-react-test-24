import 'server-only'

import { db } from '@/db'
import { type RankItem, tierList } from '@/db/schema'
import { eq, or, and } from 'drizzle-orm'
import { RankItemDto } from '@/use-cases/types'

export function toDtoMapper(item: RankItem) {
	return {
		id: item.id,
		name: item.name,
		position: item.position,
		userId: item.userId,
	}
}

type GetRankListItemProps = {
	userId: string
	name: string
	position: number
}

export async function getRankListItem({ userId, name, position }: GetRankListItemProps): Promise<RankItemDto | undefined> {
	const foundRankListItem = await db.query.tierList.findFirst({
		where: and(eq(tierList.userId, userId), or(eq(tierList.position, position), eq(tierList.name, name))),
	})

	if (!foundRankListItem) {
		return undefined
	}

	return toDtoMapper(foundRankListItem)
}
