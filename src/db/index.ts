import * as schema from './schema'
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '@/env'

declare global {
	// biome-ignore lint/style/noVar: this only works with var
	var db: PostgresJsDatabase<typeof schema> | undefined
}

// biome-ignore lint/suspicious/noRedeclare: to support hot reloading
let db: PostgresJsDatabase<typeof schema>

if (env.NODE_ENV === 'production') {
	db = drizzle(postgres(env.DATABASE_URL), { schema })
} else {
	global.db = global.db ?? drizzle(postgres(env.DATABASE_URL), { schema })
	db = global.db
}

export { db }
