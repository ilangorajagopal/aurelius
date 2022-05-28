import type { ReactNode } from 'react'
import type React from 'react'

export enum ButtonSize {
	LG,
	MD,
	sm,
	XS,
}

export type ButtonProps = {
	bg?: string
	children: ReactNode | string
	className?: string
	isDisabled?: boolean
	isLoading?: boolean
	loadingText?: string
	onClick: React.MouseEventHandler<HTMLButtonElement>
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	shadow?: string
	size?: ButtonSize
}
