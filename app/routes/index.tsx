import type { ReactNode } from 'react'
import { Link } from '@remix-run/react'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'

type ContainerProps = {
	children: ReactNode
}

export function Container(props: ContainerProps) {
	return (
		<div className='flex h-full w-full items-start justify-center'>
			<div className='container flex h-full w-full flex-col items-center justify-center space-y-8 text-white'>
				{props.children}
			</div>
		</div>
	)
}

export default function Index() {
	return (
		<Container>
			<img
				className='w-48'
				src='/images/logo_dark.png'
				alt='Aurelius Logo'
			/>
			<div className='flex w-full flex-col items-center justify-center space-y-2'>
				<p className='text-center text-lg leading-8 text-white md:w-1/2'>
					Beautiful, minimal writing app that helps you build a
					writing habit.
				</p>
				<p className='text-center text-lg leading-8 text-gray-400 md:w-1/2'>
					Eliminate distractions when writing, track your daily
					writing goal, and more.
				</p>
			</div>
			<div className='flex items-center justify-center space-x-4'>
				<Link to='/app'>
					<button className='text-md inline-flex hidden justify-center rounded-md border border-transparent bg-brand-500 px-4 py-2 font-semibold text-brand-800 transition-all duration-200 hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'>
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
		</Container>
	)
}
