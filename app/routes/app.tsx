import { Outlet, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useState } from 'react'
import { writeStorage } from '@rehooks/local-storage'
import { Autosave } from 'react-autosave'
import type { User } from '~/models/user.server'
import { auth } from '~/services/auth.server'
import Header from '~/routes/app/header'
import Footer from '~/routes/app/footer'
import { savePostToDb } from '../../common/utils/save-post'
import { POST_LOCAL_STORAGE_KEY } from '~/lib/constants'

export type ContextType = {
	content: string
	setContent: Dispatch<SetStateAction<string>>
	title: string
	setTitle: Dispatch<SetStateAction<string>>
	wordCount: number
	setWordCount: Dispatch<SetStateAction<number>>
	user: User
}

export let loader: LoaderFunction = async ({ request }) => {
	// If the user is here, it's already authenticated, if not redirect them to
	// the login page.
	let user = await auth.isAuthenticated(request)
	return json({ user })
}

export default function App() {
	const { user } = useLoaderData<{ user: User }>()
	const [content, setContent] = useState('')
	const [isSaving, setIsSaving] = useState(false)
	const [postId, setPostId] = useState('')
	const [title, setTitle] = useState('')
	const [wordCount, setWordCount] = useState(0)

	const context: ContextType = {
		content,
		setContent,
		title,
		setTitle,
		wordCount,
		setWordCount,
		user,
	}

	const savePost = async (data: any) => {
		if (data.title && data.content && data.wordCount) {
			setIsSaving(true)
			const { title, content, wordCount } = data
			const update = {
				title,
				content,
				wordCount,
			}

			if (user) {
				const { id } = await savePostToDb({
					postId: data.postId,
					update,
					userId: user.id,
				})

				setPostId(id)
			} else {
				writeStorage(POST_LOCAL_STORAGE_KEY, update)
			}
			setIsSaving(false)
		}
	}

	const autoSavePost = useCallback(savePost, [])
	const autoSaveData = { postId, title, content, wordCount }

	return (
		<main className='flex h-full w-full flex-col items-center justify-start'>
			<Header isSaving={isSaving} user={user} />
			<Autosave
				data={autoSaveData}
				interval={5000}
				onSave={autoSavePost}
			/>
			<Outlet context={context} />
			<Footer wordCount={wordCount} />
		</main>
	)
}
