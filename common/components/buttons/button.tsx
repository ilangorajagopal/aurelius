import React from 'react'
import type { FC } from 'react'
import type { ButtonProps } from './types'
import { ButtonSize } from './types'

const ButtonDefault: FC<ButtonProps> = ({
	bg = 'bg-gray-700',
	children,
	className,
	isDisabled,
	isLoading,
	loadingText,
	onClick,
	shadow = '',
	size = ButtonSize.MD,
}) => {
	return (
		<button
			className={`focus-visible:ring-blend-darken inline-flex justify-center rounded-md border border-transparent px-4 py-1 text-sm font-semibold text-gray-200 hover:bg-blend-darken focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className} ${bg} ${shadow}`}
			disabled={isDisabled}
			onClick={onClick}
		>
			{isLoading && (
				<svg
					className='-ml-1 mr-2 h-4 w-4 animate-spin text-white'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
				>
					<circle
						className='opacity-25'
						cx='12'
						cy='12'
						r='10'
						stroke='currentColor'
						strokeWidth='4'
					/>
					<path
						className='opacity-75'
						fill='currentColor'
						d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
					/>
				</svg>
			)}
			{isLoading ? loadingText : children}
		</button>
	)
}

export default ButtonDefault