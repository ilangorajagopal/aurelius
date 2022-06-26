import { Form, Link } from '@remix-run/react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { Root } from '@radix-ui/react-navigation-menu'
import type { User } from '~/models/user.server'
import Popover from '@components/popover'
import RadioGroup from '@components/radio-group'
import Switch from '@components/switch'
import { CornersIcon } from '@radix-ui/react-icons'
import { PrimaryButton } from '@components/buttons'
import ProfileDropdown from '~/routes/profile-dropdown'

const sessionGoalOptions = [
	{
		id: 'duration',
		label: 'Duration',
		value: 'duration',
	},
	{
		id: 'wordCount',
		label: 'Word Count',
		value: 'wordCount',
	},
]

type HeaderProps = {
	focusMode?: boolean
	setFocusMode?: Dispatch<SetStateAction<boolean>>
	isSaving?: boolean
	user: User
}

export default function Header(props: HeaderProps) {
	const { focusMode, setFocusMode, isSaving, user } = props

	return (
		<Root
			className={`flex h-24 w-full items-center justify-center border-b border-gray-700 transition-all duration-200 hover:opacity-100 ${
				focusMode ? 'opacity-5' : 'opacity-100'
			}`}
		>
			<div className='container grid h-full w-full grid-cols-3 gap-4 px-16'>
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
					{false && (
						<>
							<Link to='/app'>
								<button className='inline-flex justify-center rounded-md border border-transparent bg-brand-500 px-4 py-1 text-sm font-semibold text-white hover:bg-brand-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'>
									Write
								</button>
							</Link>
							<Link to='/app/dashboard'>
								<button className='inline-flex justify-center rounded-md border border-transparent bg-brand-500 px-4 py-1 text-sm font-semibold text-white hover:bg-brand-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'>
									Dashboard
								</button>
							</Link>
						</>
					)}
				</div>
				<div className='col-span-1 flex h-full items-center justify-end space-x-4'>
					{isSaving && (
						<div className='flex items-center justify-center px-4'>
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
							<span className='text-sm text-white'>
								Saving...
							</span>
						</div>
					)}
					<Popover
						title='New Session'
						trigger={
							<button className='inline-flex justify-center rounded-md border border-transparent bg-gray-700 px-4 py-1 text-sm font-semibold text-gray-200 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2'>
								New Session
							</button>
						}
					>
						<div className='mt-4 w-96'>
							<form
								className='grid w-full grid-cols-5 gap-4'
								action='/session/new'
								method='post'
							>
								<label
									htmlFor='session_goal'
									className='col-span-3 text-sm'
								>
									Session Type
								</label>
								<RadioGroup
									className='col-span-2 space-y-2'
									defaultValue='duration'
									options={sessionGoalOptions}
								/>
								<label
									htmlFor='session_target'
									className='col-span-3 text-sm'
								>
									Target
								</label>
								<div className='col-span-2 flex items-center justify-start space-x-2'>
									<input
										className='h-8 w-16 rounded-md border border-white bg-transparent px-2 py-1 text-sm'
										defaultValue={30}
										type='number'
									/>
									<span className='text-sm'>minutes</span>
								</div>
								<label
									htmlFor='session_end_notification'
									className='col-span-3 text-sm'
								>
									Notify when session ends
								</label>
								<div className='col-span-2'>
									<Switch />
								</div>
								<label
									htmlFor='session_music'
									className='col-span-3 text-sm'
								>
									Music
								</label>
								<div className='col-span-2'>
									<Switch />
								</div>
								<div className='col-span-5 flex justify-end'>
									<PrimaryButton type='submit'>
										<span className='text-sm'>Start</span>
									</PrimaryButton>
								</div>
							</form>
						</div>
					</Popover>
					<button
						className='flex h-8 w-8 items-center justify-center'
						onClick={() => setFocusMode?.(!focusMode)}
					>
						<CornersIcon className='text-white' />
					</button>
					<ProfileDropdown user={user} />
				</div>
			</div>
		</Root>
	)
}
