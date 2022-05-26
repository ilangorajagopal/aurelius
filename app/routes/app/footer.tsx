type FooterProps = {
	wordCount: number
}

export default function Footer(props: FooterProps) {
	const { wordCount } = props

	return (
		<div className='fixed bottom-0 left-0 flex h-12 w-full items-center justify-between px-6'>
			<div className='flex items-center justify-start'>
				<span className='text-sm text-gray-500'>{`${wordCount} words`}</span>
			</div>
		</div>
	)
}
