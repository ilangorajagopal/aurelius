import Greeting from '~/routes/dashboard/greeting'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { auth } from '~/services/auth.server'
import { useLoaderData } from '@remix-run/react'
import type { User } from '~/models/user.server'
import type { Post } from '~/models/post.server'
import { getAllPostsFromAuthor } from '~/models/post.server'
import Posts from '~/routes/dashboard/posts'

export let loader: LoaderFunction = async ({ request }) => {
	// If the user is here, it's already authenticated, if not redirect them to
	// the login page.
	let user = await auth.isAuthenticated(request)
	const posts = await getAllPostsFromAuthor(user?.id as string)
	return json({ posts, user })
}

export default function Index() {
	const { posts, user } = useLoaderData<{ posts: Post[]; user: User }>()

	return (
		<div className='flex flex h-full w-full items-start justify-center py-16'>
			<div className='w-full max-w-3xl flex-col items-center justify-start space-y-16'>
				<Greeting name={user.name as string} />
				<Posts posts={posts} />
			</div>
		</div>
	)
}
