import type { ActionFunction } from '@remix-run/node'
import { createPost } from '~/models/post.server'
import { json } from '@remix-run/node'

export let action: ActionFunction = async ({ request }) => {
	switch (request.method) {
		case 'POST': {
			const { data } = await request.json()
			const post = await createPost(data)

			return json({ post }, 200)
		}
	}
}
