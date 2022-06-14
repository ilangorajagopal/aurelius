import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import type { FC } from 'react'

export const RadioGroupRoot = RadioGroupPrimitive.Root
export const RadioGroupIndicator = RadioGroupPrimitive.Indicator
export const RadioGroupItem = RadioGroupPrimitive.Item
export const RadioGroupRadio = RadioGroupPrimitive.Radio

type RadioOption = {
	value: string
	id: string
	label: string
}

type RadioGroupProps = {
	className?: string
	defaultValue: string
	options: RadioOption[]
}

const RadioGroup: FC<RadioGroupProps> = ({
	className,
	defaultValue,
	options,
}) => {
	return (
		<RadioGroupRoot className={className} defaultValue={defaultValue}>
			{options.map((option) => (
				<RadioGroupItem
					className='flex items-center space-x-2'
					key={option.id}
					id={option.id}
					value={option.value}
				>
					<RadioGroupIndicator />
					<label htmlFor={option.id}>{option.label}</label>
				</RadioGroupItem>
			))}
		</RadioGroupRoot>
	)
}

export default RadioGroup
