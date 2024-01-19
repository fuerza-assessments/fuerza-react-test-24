import 'server-only'

import { db } from '@/db'
import { RankItemDto } from '@/use-cases/types'

export function toDtoMapper(item: RankItemDto) {
	return {
		id: item.id,
		name: item.name,
		position: item.position,
		userId: item.userId,
	}
}

export async function getRankListItems(): Promise<RankItemDto[]> {
	const items = await db.query.tierList.findMany()
	return items.map(toDtoMapper)
}
