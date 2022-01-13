import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../prisma';
import { addNewUserToContacts } from '../../../lib/email';

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	callbacks: {
		async session({ session, token, user }) {
			session.userId = user.id;
			return session;
		},
	},
	events: {
		createUser: async (message) => {
			const { user } = message;
			const { email } = user;
			const username = email
				.replace(/@.*$/, '')
				.replace(/[^a-zA-Z0-9]/g, '_');
			const userData = await prisma.user.update({
				data: { username },
				where: {
					id: user.id,
				},
			});
			await addNewUserToContacts(userData);
		},
	},
	pages: {
		signIn: '/sign-in',
	},
	providers: [
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM_ADDRESS,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
});
