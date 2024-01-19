'use server'

import { createRankListItem } from '@/data-access/rank-list/create-rank-list-item.persistence'
import { getRankListItem } from '@/data-access/rank-list/get-rank-list-item.persistence'
import { auth } from '@/lib/auth'
import { addRankListItem } from '@/use-cases/rank-list/add-item.use-case'
import { ValidationError } from '@/use-cases/utils'
import { revalidatePath } from 'next/cache'

type Form = {
	name: string
	position: string
}

type FieldErrorsState = {
	status: 'field-errors'
	errors: Partial<Record<keyof Form, string>>
}

type DefaultState = {
	status: 'default'
}

type SubmitErrorState = {
	status: 'error'
	errors: string
}

type SuccessState = {
	status: 'success'
}

type CreateItemState = { form: Form } & (SuccessState | SubmitErrorState | FieldErrorsState | DefaultState)

export async function addRankListItemAction(state: CreateItemState, formData: FormData): Promise<CreateItemState> {
	const { getUser } = await auth()

	const submittedForm = {
		name: formData.get('name') as string,
		position: formData.get('position') as string,
	}

	try {
		await addRankListItem(
			{ getUser, createRankListItem, getRankListItem },
			{
				name: submittedForm.name.toLowerCase(),
				position: parseInt(submittedForm.position),
			},
		)
		revalidatePath('/')
		return {
			form: {
				name: '',
				position: '1',
			},
			status: 'success',
		}
	} catch (err) {
		const error = err as Error
		if (error instanceof ValidationError) {
			return {
				form: submittedForm,
				status: 'field-errors',
				errors: error.getErrors(),
			}
		}
		return {
			form: submittedForm,
			status: 'error',
			errors: error.message,
		}
	}
}
