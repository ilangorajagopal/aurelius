import type { FC } from 'react'
import type { ButtonProps } from './types'
import Button from './button'

type ButtonPrimaryProps = ButtonProps & {
	bg?: string
	shadow?: string
}

const ButtonPrimary: FC<ButtonPrimaryProps> = ({
	bg = 'bg-brand-500',
	children,
	className,
	isDisabled,
	isLoading,
	loadingText,
	onClick,
	shadow = 'shadow-md',
}) => {
	return (
		<Button
			bg={bg}
			className={`${className} ${shadow}`}
			isDisabled={isDisabled}
			isLoading={isLoading}
			loadingText={loadingText}
			onClick={onClick}
		>
			{children}
		</Button>
	)
}

export default ButtonPrimary