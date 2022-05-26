import { prisma } from '~/db.server'
export type { Post } from '@prisma/client'

export async function getAllPostsFromAuthor(userId: string) {
	if (!userId) {
		return { message: 'invalid_user_id' }
	}
	const posts = await prisma.post.findMany({
		where: { userId },
		orderBy: { createdAt: 'desc' },
	})

	return posts
}

export async function getPost(id: string) {
	const post = await prisma.post.findUnique({
		where: {
			id: id,
		},
	})

	return post
}

export async function updatePost(id: string, data: any) {
	const post = await prisma.post.update({
		data,
		where: {
			id,
		},
	})

	return post
}

export async function deletePost(id: string) {
	const deletedPost = await prisma.post.delete({
		where: {
			id,
		},
		select: {
			title: true,
		},
	})

	const deletedWritingSessions = await prisma.writingSession.deleteMany({
		where: {
			postId: id,
		},
	})

	return { message: 'deleted' }
}

export async function createPost(data: any) {
	const post = await prisma.post.create({
		data,
	})

	return post
}
