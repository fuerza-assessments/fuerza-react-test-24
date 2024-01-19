import 'server-only'

import { db } from '@/db'
import { tierList } from '@/db/schema'
import { CreateTierItemDto } from '@/use-cases/types'

export async function createTierListItem(tierListItem: CreateTierItemDto): Promise<unknown> {
	const data = await db.insert(tierList).values(tierListItem)
	return data
}
