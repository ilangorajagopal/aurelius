import { nanoid } from 'nanoid'
import type { User } from '~/models/user.server'
import type { Post } from '~/models/post.server'
import { createPost, updatePost } from '~/models/post.server'

type Params = {
	post: Post | null
	update: any
	userId: User['id']
}

export async function savePostToDb(params: Params) {
	const { post, update, userId } = params
	if (post) {
		const updatedPost = await updatePost(post.id, update)

		return updatedPost
	} else {
		const id = nanoid(32)
		const slug = update.title.toLowerCase().split(' ').join('-')
		const shareId = `${update.title
			.toLowerCase()
			.split(' ')
			.join('-')}-${id}`
		const record = { ...update, slug, shareId, userId }
		const post = await createPost(record)

		return post
	}
}
