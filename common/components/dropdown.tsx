import type { FC, ReactNode } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

export const DropdownMenuRoot = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuContent = DropdownMenuPrimitive.Content
export const DropdownMenuItem = DropdownMenuPrimitive.Item
export const DropdownMenuArrow = DropdownMenuPrimitive.Arrow

type DropdownMenuItemProps = {
	label: string
	onClick: () => void
}

type DropdownMenuProps = {
	items: DropdownMenuItemProps[]
	trigger: ReactNode
}

const DropdownMenu: FC<DropdownMenuProps> = ({ items, trigger }) => {
	return (
		<DropdownMenuRoot>
			<DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
			<DropdownMenuContent></DropdownMenuContent>
		</DropdownMenuRoot>
	)
}

export default DropdownMenu
