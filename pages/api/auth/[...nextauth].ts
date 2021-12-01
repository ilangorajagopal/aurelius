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
		createUser: (message) => {
			const { user } = message;
			addNewUserToContacts(user);
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
