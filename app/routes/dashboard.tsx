import { Outlet, useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { auth } from '~/services/auth.server'
import type { User } from '~/models/user.server'
import Header from '~/routes/header'

export let loader: LoaderFunction = async ({ request }) => {
	// If the user is here, it's already authenticated, if not redirect them to
	// the login page.
	let user = await auth.isAuthenticated(request)
	return json({ user })
}

export default function Dashboard() {
	const { user } = useLoaderData<{ user: User }>()

	return (
		<main className='flex h-full w-full flex-col items-center justify-start'>
			<Header user={user} />
			<Outlet />
		</main>
	)
}
