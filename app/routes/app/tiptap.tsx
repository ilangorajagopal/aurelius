import type { Dispatch, FC, SetStateAction } from 'react'
import { useOutletContext } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useEditor, BubbleMenu, EditorContent } from '@tiptap/react'
import BubbleMenuExt from '@tiptap/extension-bubble-menu'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import { deleteFromStorage, useLocalStorage } from '@rehooks/local-storage'
import Alert from '@components/alert'
import { ButtonDanger, ButtonPrimary } from '@components/buttons'
import { POST_LOCAL_STORAGE_KEY } from '~/lib/constants'
import type { ContextType } from '~/routes/app'
import { Editor } from '@tiptap/core'
import EditorToolbar from '~/routes/app/editor-toolbar'

type TipTapProps = {
	content: string
	setContent: Dispatch<SetStateAction<string>>
	setTitle: Dispatch<SetStateAction<string>>
	setWordCount: Dispatch<SetStateAction<number>>
}

const TipTap: FC<TipTapProps> = ({
	content,
	setContent,
	setTitle,
	setWordCount,
}) => {
	const [localPost] = useLocalStorage(POST_LOCAL_STORAGE_KEY)
	const { user } = useOutletContext<ContextType>()
	const [localPostAlertOpen, setLocalPostAlertOpen] = useState(false)

	const editor = useEditor({
		content,
		editorProps: {
			attributes: {
				class: '',
			},
		},
		extensions: [
			BubbleMenuExt.configure({
				tippyOptions: {
					arrow: true,
				},
			}),
			Image,
			Link.configure({ linkOnPaste: true, openOnClick: false }),
			Placeholder.configure({
				placeholder: 'Start writing...',
			}),
			StarterKit.configure({
				heading: {
					levels: [1, 2, 3],
				},
			}),
		],
		onUpdate({ editor }) {
			const html = editor.getHTML()
			const contentText = editor?.state?.doc?.textContent
			const wordCount = contentText?.split(' ').length
			setContent(html)
			setWordCount(wordCount)
		},
	})

	useEffect(() => {
		if (editor && localPost) {
			setLocalPostAlertOpen(true)
		}
	}, [editor])

	const updateEditorWordCount = (content: string) => {
		const wordCount = content.split(' ').length
		setWordCount(wordCount)
	}

	const discardLocalPost = () => {
		deleteFromStorage(POST_LOCAL_STORAGE_KEY)
	}

	const loadLocalPost = () => {
		if (editor && localPost) {
			const { title, content } = JSON.parse(JSON.stringify(localPost))

			setTitle(title)
			setContent(content)

			if (editor.isEmpty) {
				editor.commands.setContent(content)
				updateEditorWordCount(editor.state.doc.textContent)
			}
			if (user) {
				discardLocalPost()
			}
		}
	}

	return (
		<>
			<div className='h-auto min-h-max w-full'>
				{editor && (
					<BubbleMenu editor={editor}>
						<EditorToolbar editor={editor} />
					</BubbleMenu>
				)}
				<EditorContent editor={editor} />
			</div>
			<Alert
				open={localPostAlertOpen}
				setOpen={setLocalPostAlertOpen}
				cancel={
					<ButtonDanger onClick={discardLocalPost}>
						Discard Post
					</ButtonDanger>
				}
				action={
					<ButtonPrimary onClick={loadLocalPost}>
						Load Saved Post
					</ButtonPrimary>
				}
				description='We found your post from a previous session. Do you want to load it?'
				contentClassName='fixed top-28 right-1/2 translate-x-1/2 z-10 w-[960px] h-[4rem] flex items-center justify-between bg-gray-800 text-white px-8'
			/>
		</>
	)
}

export default TipTap
