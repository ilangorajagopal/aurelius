import { GoogleStrategy } from 'remix-auth-google'
import * as User from '~/models/user.model'
import { auth } from '~/services/auth.server'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string

auth.use(
	// @ts-ignore
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/auth/google/callback',
		},
		async ({ accessToken, refreshToken, extraParams, profile }) => {
			return User.findOrCreate({ email: profile.emails[0].value })
		}
	)
)
