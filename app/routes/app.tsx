import { Outlet, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { useCallback, useState } from 'react'
import { useLocalStorage, writeStorage } from '@rehooks/local-storage'
import { Autosave } from 'react-autosave'
import { auth } from '~/services/auth.server'
import type { User } from '~/models/user.server'
import Header from '~/routes/app/header'
import Footer from '~/routes/app/footer'
import { savePostToDb } from '../../common/utils/save-post'

export type ContextType = {
	content: string
	setContent: (content: string) => void
	title: string
	setTitle: (title: string) => void
	wordCount: number
	setWordCount: (wordCount: number) => void
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
	const [post, setPost] = useState(null)
	const [title, setTitle] = useState('')
	const [wordCount, setWordCount] = useState(0)
	const [localPost] = useLocalStorage('aurelius_guest_user_post')

	const context: ContextType = {
		content,
		setContent,
		title,
		setTitle,
		wordCount,
		setWordCount,
	}

	const savePost = async (data: any) => {
		if (data.title && data.content && data.wordCount) {
			setIsSaving(true)

			const update = {
				title,
				content,
				wordCount,
			}

			if (user) {
				const data = await savePostToDb({
					post,
					update,
					userId: user.id,
				})
				// @ts-ignore
				setPost(data)
			} else {
				writeStorage('aurelius_guest_user_post', update)
			}
			setIsSaving(false)
		}
	}

	const autoSavePost = useCallback(savePost, [])
	const autoSaveData = { post, title, content, wordCount }

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
