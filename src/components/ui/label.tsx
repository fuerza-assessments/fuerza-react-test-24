'use client'

import { ElementRef, forwardRef, ComponentPropsWithoutRef } from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

const labelVariants = tv({
	base: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
})

const Label = forwardRef<ElementRef<typeof LabelPrimitive.Root>, ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>>(
	({ className, ...props }, ref) => <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />,
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
