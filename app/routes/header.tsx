import { Link } from '@remix-run/react'
import { Root } from '@radix-ui/react-navigation-menu'
import type { User } from '~/models/user.server'
import ProfileDropdown from '~/routes/profile-dropdown'

type HeaderProps = {
	user: User
}

export default function Header(props: HeaderProps) {
	return (
		<Root
			className={`flex h-24 w-full items-center justify-center border-b border-gray-700 transition-all duration-200 hover:opacity-100`}
		>
			<div className='container grid h-full w-full grid-cols-2 gap-4 px-16'>
				<div className='col-span-1 flex h-full items-center justify-start'>
					<Link to='/'>
						<img
							className='w-24'
							src='/images/logo_dark.png'
							alt='Aurelius Logo'
						/>
					</Link>
				</div>
				<ProfileDropdown user={props.user} />
			</div>
		</Root>
	)
}
