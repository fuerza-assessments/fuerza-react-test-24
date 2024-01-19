import { ZodError, z } from 'zod'

type ValidatedFields = 'name' | 'userId' | 'position'

export class TierItemEntityValidationError extends Error {
	private errors: Record<ValidatedFields, string | undefined>

	constructor(errors: Record<ValidatedFields, string | undefined>) {
		super('An error occurred validating an item entity')
		this.errors = errors
	}

	getErrors() {
		return this.errors
	}
}

export class TierItemEntity {
	private id?: number
	private name: string
	private position: number
	private userId: string

	constructor({
		id,
		name,
		userId,
		position,
	}: {
		id?: number
		name: string
		userId: string
		position: number
	}) {
		this.id = id
		this.name = name
		this.userId = userId
		this.position = position

		this.validate()
	}

	getName() {
		return this.name
	}

	getPosition() {
		return this.position
	}

	getUserId() {
		return this.userId
	}

	getId() {
		return this.id
	}

	setPosition(position: number) {
		this.position = position
	}

	private validate() {
		const itemSchema = z.object({
			name: z
				.string()
				.min(1)
				.regex(/^[a-z]+$/, 'Name must only contain lower case letters'),
			userId: z.string().min(1),
			position: z.number().min(1),
		})

		try {
			itemSchema.parse(this)
		} catch (err) {
			const error = err as ZodError
			const errors = error.flatten().fieldErrors
			throw new TierItemEntityValidationError({
				name: errors.name?.[0],
				userId: errors.userId?.[0],
				position: errors.position?.[0],
			})
		}
	}
}
