import { useOutletContext } from '@remix-run/react'
import type { ContextType } from '~/routes/app'
import TipTap from './tiptap'

export default function Index() {
	const { content, setContent, title, setTitle, setWordCount } =
		useOutletContext<ContextType>()

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
					setTitle={setTitle}
					setWordCount={setWordCount}
				/>
			</div>
		</section>
	)
}
