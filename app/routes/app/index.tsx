import { useState } from 'react'
import TipTap from '~/routes/tiptap'

export default function Index() {
	const [content, setContent] = useState('')
	const [title, setTitle] = useState('')
	const [wordCount, setWordCount] = useState(0)

	return (
		<section className='flex h-full w-full flex-grow flex-col items-center justify-start'>
			<div className='h-full w-full max-w-3xl space-y-4 py-16'>
				<div className='w-full'>
					<input
						className='h-24 w-full bg-transparent text-5xl font-semibold text-white focus:outline-none'
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Title'
						type='text'
						value={title}
					/>
				</div>
				<TipTap
					content={content}
					setContent={setContent}
					setWordCount={setWordCount}
				/>
			</div>
		</section>
	)
}
