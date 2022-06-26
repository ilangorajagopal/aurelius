import type { ReactNode } from 'react'
import { Form, Link } from '@remix-run/react'
import type { User } from '~/models/user.server'
import DropdownMenu from '@components/dropdown'
import Avatar from '@components/avatar'
import { ExitIcon, LayersIcon, PersonIcon } from '@radix-ui/react-icons'

interface Props {
	user: User
}

export default function ProfileDropdown(props: Props) {
	const { user } = props

	const profileMenuItems = [
		{
			icon: <LayersIcon />,
			label: 'Dashboard',
			link: '/dashboard',
			onSelect: (e: Event) => e.preventDefault(),
		},
		{
			icon: (<ExitIcon />) as ReactNode,
			label: (
				<Form action='/logout' method='post'>
					<button className='flex h-full w-full items-center justify-start'>
						Logout
					</button>
				</Form>
			) as ReactNode,
			onSelect: (e: Event) => e.preventDefault(),
		},
	]

	return (
		<div className='flex h-full items-center justify-end'>
			{user ? (
				<DropdownMenu
					items={profileMenuItems}
					trigger={
						<button className='flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-600'>
							<Avatar
								src={user?.image || ''}
								alt='User Profile Image'
								fallback={
									user?.name?.charAt(0)?.toUpperCase() || (
										<PersonIcon className='text-white' />
									)
								}
							/>
						</button>
					}
				/>
			) : (
				<Link to='/login'>
					<button className='inline-flex justify-center rounded-md border border-transparent bg-brand-500 px-4 py-1 text-sm font-semibold text-white hover:bg-brand-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'>
						Login
					</button>
				</Link>
			)}
		</div>
	)
}
