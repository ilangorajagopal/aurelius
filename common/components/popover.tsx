import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Cross2Icon } from '@radix-ui/react-icons'
import type { FC, ReactNode } from 'react'

const PopoverRoot = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverContent = PopoverPrimitive.Content
const PopoverArrow = PopoverPrimitive.Arrow
const PopoverClose = PopoverPrimitive.Close

type PopoverProps = {
	arrow: boolean
	close: boolean
	children: string | ReactNode
	trigger: ReactNode
}

const Popover: FC<PopoverProps> = ({ arrow, close, children, trigger }) => {
	return (
		<PopoverRoot>
			<PopoverTrigger asChild>{trigger}</PopoverTrigger>
			<PopoverContent className='relative h-72 min-h-fit w-96 rounded-md bg-white p-4'>
				{children}
				{arrow && <PopoverArrow className='fill-white' />}
				{close && (
					<PopoverClose className='absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-transparent transition-colors duration-200 hover:bg-brand-100'>
						<Cross2Icon />
					</PopoverClose>
				)}
			</PopoverContent>
		</PopoverRoot>
	)
}

export default Popover
