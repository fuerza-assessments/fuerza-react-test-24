import 'server-only'

import { db } from '@/db'
import { items } from '@/db/schema'
import { CreateItemDto } from '@/use-cases/types'

export async function createItem(item: CreateItemDto): Promise<void> {
	await db.insert(items).values(item)
}
