import 'server-only'

import { db } from '@/db'
import { TierItemDto } from '@/use-cases/types'

export function toDtoMapper(item: TierItemDto) {
	return {
		id: item.id,
		name: item.name,
		position: item.position,
		userId: item.userId,
	}
}

export async function getTierListItems(): Promise<TierItemDto[]> {
	const items = await db.query.tierList.findMany()
	return items.map(toDtoMapper)
}
