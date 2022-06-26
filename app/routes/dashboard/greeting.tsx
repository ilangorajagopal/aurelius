import { getGreeting } from '@utils/helpers'

interface GreetingProps {
	name: string
}

export default function Greeting(props: GreetingProps) {
	const { name } = props

	return (
		<div className='flex w-full items-center justify-start'>
			<h1 className='text-4xl font-bold text-white'>
				{getGreeting(name)}
			</h1>
		</div>
	)
}
