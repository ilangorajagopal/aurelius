import { Authenticator } from 'remix-auth'
import { EmailLinkStrategy } from 'remix-auth-email-link'
import { sessionStorage } from '~/services/session.server'
import sendEmail from '~/services/email.server'
import type { User } from '~/models/user.model'
import { createUser, getUserByEmail } from '~/models/user.model'

let secret = process.env.MAGIC_LINK_SECRET

if (!secret) throw new Error('Missing MAGIC_LINK_SECRET environment variable')

export let auth = new Authenticator<User>(sessionStorage)

auth.use(
	// @ts-ignore
	new EmailLinkStrategy(
		{
			sendEmail,
			secret,
			callbackURL: '/verify',
			validateSessionMagicLink: true,
		},
		async ({
			email,
			form,
			magicLinkVerify,
		}: {
			email: string
			form: FormData
			magicLinkVerify: boolean
		}) => {
			let user = await getUserByEmail(email)
			if (user) {
				return user
			} else {
				const newUser = await createUser(email)
				return newUser
			}
		}
	)
)
