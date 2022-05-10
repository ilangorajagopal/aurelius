import { Link } from '@remix-run/react'
import { Content, Item, List, Root } from '@radix-ui/react-navigation-menu'
import * as Popover from '@radix-ui/react-popover'
import { CornersIcon, Cross2Icon, DownloadIcon } from '@radix-ui/react-icons'

const PopoverRoot = Popover.Root
const PopoverTrigger = Popover.Trigger
const PopoverContent = Popover.Content
const PopoverArrow = Popover.Arrow
const PopoverClose = Popover.Close

export default function Header() {
	return (
		<Root className='container grid h-24 w-full grid-cols-3 gap-4 px-16'>
			<div className='col-span-1 flex h-full items-center justify-start'>
				<Link to='/'>
					<img
						className='w-24'
						src='/images/logo_dark.png'
						alt='Aurelius Logo'
					/>
				</Link>
			</div>
			<div className='col-span-1 flex items-center justify-center space-x-4'>
				{false ? (
					<>
						<Link to='/app'>
							<button className='inline-flex justify-center rounded-md border border-transparent bg-brand-500 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'>
								Write
							</button>
						</Link>
						<Link to='/app/dashboard'>
							<button className='inline-flex justify-center rounded-md border border-transparent bg-brand-500 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'>
								Dashboard
							</button>
						</Link>
					</>
				) : null}
			</div>
			<div className='col-span-1 flex items-center justify-end space-x-4'>
				<PopoverRoot>
					<PopoverTrigger asChild>
						<button className='inline-flex justify-center rounded-md border border-transparent bg-gray-700 px-4 py-1 text-sm font-semibold text-gray-200 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2'>
							New Session
						</button>
					</PopoverTrigger>
					<PopoverContent className='relative h-72 min-h-fit w-96 rounded-md bg-white p-4'>
						<h4>New Session</h4>
						<PopoverArrow className='fill-white' />
						<PopoverClose className='absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-transparent transition-colors duration-200 hover:bg-brand-100'>
							<Cross2Icon />
						</PopoverClose>
					</PopoverContent>
				</PopoverRoot>
				<button className='flex h-10 w-10 items-center justify-center'>
					<DownloadIcon className='text-white' />
				</button>
				<button className='flex h-10 w-10 items-center justify-center'>
					<CornersIcon className='text-white' />
				</button>
				<Link to='/app/login'>
					<button className='inline-flex justify-center rounded-md border border-transparent bg-brand-500 px-4 py-1 text-sm font-semibold text-brand-700 hover:bg-brand-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'>
						Login
					</button>
				</Link>
			</div>
		</Root>
	)
}
