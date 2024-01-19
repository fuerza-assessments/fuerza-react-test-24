'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState, useFormStatus } from 'react-dom'
import { HTMLAttributes, useState, useEffect, useRef } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'
import { addRankListItemAction } from './_actions/add-item-to-list.action'
import { cn } from '@/lib/utils'

export function AddItemForm() {
	const { toast } = useToast()
	const [formState, onCreateItemAction] = useFormState(addRankListItemAction, {
		form: {
			name: '',
			position: '1',
		},
		status: 'default',
	})

	const [name, setName] = useState('')
	const [position, setPosition] = useState('1')

	const formRef = useRef<HTMLFormElement>(null)

	useEffect(() => {
		if (formState.status === 'success') {
			toast({
				title: 'Item Added',
				description: 'Your item has been added',
			})
			formRef.current?.reset()
		}
	}, [toast, formState])

	const onSubmit = (formData: FormData) => {
		const data = formData
		data.append('name', name)
		data.append('position', position)
		onCreateItemAction(data)
	}

	return (
		<>
			<h2 className='text-3xl mb-8'>Add item to rank list</h2>
			{formState.status === 'error' && (
				<Alert variant={'destructive'}>
					<Terminal className='h-4 w-4' />
					<AlertTitle>Oops!</AlertTitle>
					<AlertDescription>{formState.errors}</AlertDescription>
				</Alert>
			)}
			<form ref={formRef} action={onSubmit} className='flex flex-col gap-4'>
				<div className='flex flex-col gap-' />
				<Label htmlFor='item-name'>Name</Label>
				<Input
					defaultValue={formState.form.name}
					name='name'
					id='item-name'
					autoFocus
					onChange={e => setName(e.target.value)}
					hasError={formState.status === 'field-errors' && !!formState.errors.name}
				/>
				{formState.status === 'field-errors' && <ErrorComponent error={formState.errors.name} />}

				<Label htmlFor='position'>Position</Label>
				<Input defaultValue={formState.form.position} name='position' type='number' id='position' autoFocus onChange={e => setPosition(e.target.value)} />
				{formState.status === 'field-errors' && <ErrorComponent error={formState.errors.position} />}

				<SubmitButton idleText='Add Item' submittingText='Adding Item...' />
			</form>
		</>
	)
}

function ErrorComponent({ error }: { error?: string }) {
	return error ? <span className='text-red-400'>{error}</span> : null
}

function SubmitButton({
	idleText,
	submittingText,
	...props
}: HTMLAttributes<HTMLButtonElement> & {
	idleText: string
	submittingText: string
}) {
	const { pending } = useFormStatus()

	return (
		<Button {...props} className={cn('disabled:bg-gray-400 disabled:cursor-default', props.className)} disabled={pending}>
			{pending ? submittingText : idleText}
		</Button>
	)
}
