import type { ReactNode } from 'react'
import cx from 'classnames'
import { Link } from '@remix-run/react'

interface SettingsMenuProps {
	children: ReactNode
}

export default function SettingsMenu(props: SettingsMenuProps) {
	return (
		<div className='flex flex h-full w-full items-start justify-center py-16'>
			<div className='w-full max-w-3xl flex-col items-center justify-start space-y-8'>
				<div className='flex w-full items-center justify-between'>
					<h2 className='text-3xl font-semibold text-white'>
						Settings
					</h2>
				</div>
				<div className='grid h-full w-full grid-cols-6 gap-8'>
					<ul className='col-span-2 flex w-full flex-col items-start justify-start space-y-2 text-white'>
						<Link
							className={cx(
								'flex w-full cursor-pointer select-none items-center space-x-2 rounded-md px-2 py-2 text-sm outline-none',
								'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900'
							)}
							to={'/settings'}
						>
							<li>Profile</li>
						</Link>
						{/*<Link*/}
						{/*	className={cx(*/}
						{/*		'flex w-full cursor-pointer select-none items-center space-x-2 rounded-md px-2 py-2 text-sm outline-none',*/}
						{/*		'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900'*/}
						{/*	)}*/}
						{/*	to={'/settings/account'}>*/}
						{/*	<li>Account</li>*/}
						{/*</Link>*/}
						<Link
							className={cx(
								'flex w-full cursor-pointer select-none items-center space-x-2 rounded-md px-2 py-2 text-sm outline-none',
								'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900'
							)}
							to={'/settings/integrations'}
						>
							<li>Integrations</li>
						</Link>
					</ul>
					<div className='col-span-4'>{props.children}</div>
				</div>
			</div>
		</div>
	)
}
