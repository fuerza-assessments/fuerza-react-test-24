import 'server-only'

import { db } from '@/db'
import { tierList } from '@/db/schema'
import { CreateRankItemDto } from '@/use-cases/types'

export async function createRankListItem(tierListItem: CreateRankItemDto): Promise<unknown> {
	const data = await db.insert(tierList).values(tierListItem)
	return data
}
