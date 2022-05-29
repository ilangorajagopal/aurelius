import { nanoid } from 'nanoid'
import type { User } from '~/models/user.server'

type Params = {
	postId: string
	update: any
	userId: User['id']
}

// @ts-ignore
export async function uploadImageToS3(data) {
	const response = await fetch('/upload', {
		method: 'POST',
		body: data,
	})
	const imageData = await response.json()
	console.log(imageData.url)

	return imageData.url.replace('s3.eu-west-1.amazonaws.com/', '')
}

export async function savePostToDb(params: Params) {
	const { postId, update, userId } = params
	if (postId) {
		const response = await fetch(`/posts/${postId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: update }),
		})
		const data = await response.json()
		const { post } = data

		return post
	} else {
		const { title } = update
		const id = nanoid(32)
		const slug = title.toLowerCase().split(' ').join('-')
		const shareId = `${title.toLowerCase().split(' ').join('-')}-${id}`
		const record = { ...update, slug, shareId, userId }

		const response = await fetch('/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: record }),
		})
		const data = await response.json()
		const { post } = data

		return post
	}
}
