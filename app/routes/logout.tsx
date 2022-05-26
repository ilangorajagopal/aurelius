import type { ActionFunction } from '@remix-run/node'
import { auth } from '~/services/auth.server'

export let action: ActionFunction = async ({ request }) => {
	console.log('logout')
	await auth.logout(request, { redirectTo: '/app' })
}
