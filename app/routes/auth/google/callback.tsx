import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { auth } from '~/services/auth.server'
import { redirect } from '@remix-run/node'

export let loader: LoaderFunction = ({ request }) => {
	return auth.authenticate('google', request, {
		successRedirect: '/app',
		failureRedirect: '/login',
	})
}
