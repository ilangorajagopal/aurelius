import type { ActionFunction } from '@remix-run/node'
import { updatePost } from '~/models/post.server'
import { json } from '@remix-run/node'

export let action: ActionFunction = async ({ request, params }) => {
	switch (request.method) {
		case 'PUT': {
			const { data } = await request.json()
			const post = await updatePost(params.id as string, data)

			return json({ post }, 200)
		}
	}
}
