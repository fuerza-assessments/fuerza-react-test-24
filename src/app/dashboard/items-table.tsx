'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type SortingState } from '@tanstack/react-table'
import { Minus, MoreHorizontal, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteItemAction } from './_actions/delete-item.action'
import { incrementItemAction } from './_actions/increment-item.action'
import { decrementItemAction } from './_actions/decrement-item.action'
import { useFormState } from 'react-dom'
import { useToast } from '@/components/ui/use-toast'
import { markAsLowAction } from './_actions/mark-as-low.action'
import { unmarkAsLowAction } from './_actions/unmark-as-low.action'

export type Item = {
	id: number
	name: string
	quantity: number
	isLow: boolean
}

export function ItemsTable({ items }: { items: Item[] }) {
	const { toast } = useToast()
	const [sorting, setSorting] = React.useState<SortingState>([])

	const [unmarkLowState, unmarkAsLow] = useFormState(unmarkAsLowAction, {
		showToast: false,
	})

	const [markLowState, markAsLow] = useFormState(markAsLowAction, {
		showToast: false,
	})

	const [decrementState, decrementAction] = useFormState(decrementItemAction, {
		showToast: false,
	})

	const [incrementState, incrementAction] = useFormState(incrementItemAction, {
		showToast: false,
	})

	const [deleteState, deleteAction] = useFormState(deleteItemAction, {
		showToast: false,
	})

	useEffect(() => {
		if (unmarkLowState.showToast)
			toast({
				title: 'Item Unmarked as Low',
				description: 'This item was unmarked as low',
			})
	}, [toast, unmarkLowState])

	useEffect(() => {
		if (markLowState.showToast)
			toast({
				title: 'Item Marked as Low',
				description: 'This item was marked as low',
			})
	}, [toast, markLowState])

	useEffect(() => {
		if (deleteState.showToast)
			toast({
				title: 'Item Removed',
				description: 'This item was removed from your Stock',
			})
	}, [toast, deleteState])

	useEffect(() => {
		if (decrementState.showToast)
			toast({
				title: 'Item Moved',
				description: 'Your was moved to the Out of Stock of tab',
			})
	}, [toast, decrementState])

	useEffect(() => {
		if (incrementState.showToast)
			toast({
				title: 'Item Moved',
				description: 'Your item moved to the in stock tab',
			})
	}, [toast, incrementState])

	const columns: ColumnDef<Item>[] = [
		{
			accessorKey: 'name',
			header: 'Name',
			enableSorting: true,
		},
		{
			accessorKey: 'quantity',
			header: 'Quantity',
			enableSorting: false,
			cell: ({ row }) => {
				return (
					<form className='flex gap-2 items-center'>
						<input type='hidden' name='itemId' value={row.original.id} />
						<button type='submit' className='disabled:text-gray-600' disabled={row.original.quantity === 0} formAction={decrementAction}>
							<Minus />
						</button>
						{row.original.quantity}
						<button type='submit' formAction={incrementAction}>
							<Plus />
						</button>
					</form>
				)
			},
		},
		{
			id: 'actions',
			enableHiding: false,
			cell: ({ row }) => {
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='h-8 w-8 p-0'>
								<span className='sr-only'>Open menu</span>
								<MoreHorizontal className='h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							{row.original.isLow ? (
								<DropdownMenuItem>
									<form action={unmarkAsLow}>
										<input type='hidden' value={row.original.id} name='itemId' />
										<button type='button'>Unmark as Low</button>
									</form>
								</DropdownMenuItem>
							) : (
								<DropdownMenuItem>
									<form action={markAsLow}>
										<input type='hidden' value={row.original.id} name='itemId' />
										<button type='button'>Mark as Low</button>
									</form>
								</DropdownMenuItem>
							)}
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<form action={deleteAction}>
									<input type='hidden' value={row.original.id} name='itemId' />
									<button type='button' className='text-red-500 hover:text-red-400'>
										Remove
									</button>
								</form>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			},
		},
	]

	const table = useReactTable({
		data: items,
		columns,
		autoResetPageIndex: false,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
		onSortingChange: setSorting,
	})

	return (
		<div className='w-full border border-red-fuerza'>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : (
												<div
													{...{
														className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
														onClick: header.column.getToggleSortingHandler(),
													}}
												>
													{flexRender(header.column.columnDef.header, header.getContext())}
													{{
														asc: ' ↑',
														desc: '↓',
													}[header.column.getIsSorted() as string] ?? null}
												</div>
											)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
