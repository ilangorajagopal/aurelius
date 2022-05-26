import type { FC, ReactNode } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

export const DropdownMenuRoot = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuContent = DropdownMenuPrimitive.Content
export const DropdownMenuItem = DropdownMenuPrimitive.Item
export const DropdownMenuArrow = DropdownMenuPrimitive.Arrow

type DropdownMenuProps = {
	arrowClassName: string | undefined
	children: ReactNode
	contentClassName: string
	trigger: ReactNode
}

const DropdownMenu: FC<DropdownMenuProps> = ({
	arrowClassName,
	children,
	contentClassName,
	trigger,
}) => {
	return (
		<DropdownMenuRoot>
			<DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				className={contentClassName}
				sideOffset={5}
			>
				{children}
				<DropdownMenuArrow className={arrowClassName} offset={14} />
			</DropdownMenuContent>
		</DropdownMenuRoot>
	)
}

export default DropdownMenu
