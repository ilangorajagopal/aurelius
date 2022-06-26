import { useLoaderData } from '@remix-run/react'
import { Button } from '@components/buttons'
import type { User } from '~/models/user.server'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { auth } from '~/services/auth.server'

export let loader: LoaderFunction = async ({ request }) => {
	// If the user is here, it's already authenticated, if not redirect them to
	// the login page.
	let user = await auth.isAuthenticated(request)
	return json({ user })
}

export default function Index() {
	const { user } = useLoaderData<{ user: User }>()

	return (
		<div className='flex w-full flex-col items-start justify-start space-y-4'>
			<div className='flex w-full flex-col items-start justify-start space-y-4 overflow-hidden rounded-md shadow-md'>
				<div className='flex w-full items-center justify-start'>
					<h3 className='text-xl font-semibold text-white'>
						Profile
					</h3>
				</div>
				<form className='flex w-full flex-col items-center justify-start space-y-8'>
					<div className='flex w-full flex-col items-start justify-center space-y-2'>
						<label className='text-sm font-medium text-white'>
							Name
						</label>
						<input
							className='h-10 w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white'
							defaultValue={user.name as string}
							name='name'
							type='text'
						/>
					</div>
					<div className='flex w-full flex-col items-start justify-center space-y-2'>
						<label className='text-sm font-medium text-white'>
							Email
						</label>
						<input
							className='h-10 w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white'
							defaultValue={user.email as string}
							name='email'
							type='email'
						/>
					</div>
					<div className='flex w-full flex-col items-start justify-center space-y-2'>
						<label className='text-sm font-medium text-white'>
							Username
						</label>
						<input
							className='h-10 w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white'
							defaultValue={user.username as string}
							name='username'
							type='text'
						/>
					</div>
					<div className='flex h-16 w-full items-center justify-end'>
						<Button type='submit'>Save</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
