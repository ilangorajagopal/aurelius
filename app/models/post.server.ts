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
	return await prisma.post.findUnique({
		where: {
			id: id,
		},
	})
}

export async function updatePost(id: string, data: any) {
	return await prisma.post.update({
		data,
		where: {
			id,
		},
	})
}

export async function deletePost(id: string) {
	await prisma.post.delete({
		where: {
			id,
		},
		select: {
			title: true,
		},
	})

	await prisma.writingSession.deleteMany({
		where: {
			postId: id,
		},
	})

	return { message: 'deleted' }
}

type CreatePostParams = {
	title: string
	content: string
	wordCount: number
	slug: string
	shareId: string
	userId: string
}

export async function createPost({
	title,
	content,
	wordCount,
	slug,
	shareId,
	userId,
}: CreatePostParams) {
	return await prisma.post.create({
		data: {
			title,
			content,
			wordCount,
			slug,
			shareId,
			userId,
		},
	})
}