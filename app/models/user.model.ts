import { prisma } from '../db.server'

export type { User } from '@prisma/client'

export async function getUserById(id: string) {
	return prisma.user.findUnique({ where: { id } })
}

// @ts-ignore
export async function findOrCreate({ email }) {
	let user = await getUserByEmail(email)
	if (user) {
		return user
	} else {
		const newUser = await createUser(email)
		return newUser
	}
}

export async function getUserByEmail(email: string) {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	return user
}

export async function createUser(email: string) {
	return prisma.user.create({
		data: {
			email,
		},
	})
}
