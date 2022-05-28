import type { FC } from 'react'
import type { ButtonProps } from './types'
import Button from './button'

type ButtonDangerProps = ButtonProps & {
	bg?: string
	shadow?: string
}

const ButtonDanger: FC<ButtonDangerProps> = ({
	bg = 'bg-red-500',
	children,
	className,
	isDisabled,
	isLoading,
	loadingText,
	onClick,
	shadow = '',
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

export default ButtonDanger
