import { Link } from '@remix-run/react'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'

export default function Index() {
	return (
		<div className='flex h-full w-full items-start justify-center'>
			<div className='container flex h-full w-full flex-col items-center justify-center space-y-8 text-white'>
				<img
					className='w-64'
					src='/images/logo_dark.png'
					alt='Aurelius Logo'
				/>
				<p className='w-2/3 text-center text-lg leading-8 md:w-1/2'>
					Beautiful, minimal writing app. Eliminate distractions when
					writing, build a writing habit, track your daily writing
					goal, and more.
				</p>
				<div className='flex items-center justify-center space-x-4'>
					<Link to='/app'>
						<button className='text-md inline-flex justify-center rounded-md border border-transparent bg-brand-100 px-4 py-2 font-medium text-brand-700 hover:bg-brand-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'>
							Start Writing
						</button>
					</Link>
					<a
						target='_blank'
						href='https://twitter.com/aureliusdotink'
						rel='noreferrer'
					>
						<button className='flex items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-medium leading-8 text-brand-500'>
							<span>Twitter</span>
							<ArrowTopRightIcon className='ml-1 mt-1 h-[18px] w-[18px]' />
						</button>
					</a>
				</div>
			</div>
		</div>
	)
}
