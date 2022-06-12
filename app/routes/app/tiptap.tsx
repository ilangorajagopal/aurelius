import type { Dispatch, FC, SetStateAction } from 'react'
import { useOutletContext } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import {
	useEditor,
	BubbleMenu,
	EditorContent,
	FloatingMenu,
} from '@tiptap/react'
import BubbleMenuExt from '@tiptap/extension-bubble-menu'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import SuperImage from '@extensions/super-image'
import VideoEmbed from '@extensions/video-embed'
import { deleteFromStorage, useLocalStorage } from '@rehooks/local-storage'
import type { ContextType } from '~/routes/app'
import Alert from '@components/alert'
import { ButtonDanger, ButtonPrimary } from '@components/buttons'
import { POST_LOCAL_STORAGE_KEY } from '~/lib/constants'
import EditorToolbar from '~/routes/app/editor-toolbar'
import ImageToolbar from '~/routes/app/image-toolbar'
import EditorFloatingMenu from '~/routes/app/editor-floating-menu'
import { uploadImageToS3 } from '../../../common/utils/save-post'
import VisualBookmark from '@extensions/visual-bookmark'

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
	const fileUploadInputRef = useRef(null)
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
			SuperImage,
			VideoEmbed,
			VisualBookmark,
			Link.configure({ linkOnPaste: true, openOnClick: false }),
			Placeholder.configure({
				placeholder: 'Start writing...',
			}),
			// @ts-ignore
			StarterKit.configure({
				heading: {
					levels: [2, 3],
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

	// @ts-ignore
	const uploadImage = async (event) => {
		const file = event.target.files[0]

		if (file) {
			const formData = new FormData()
			formData.append('image', file)

			const url = await uploadImageToS3(formData)
			if (url) {
				editor?.chain().focus().setImage({ src: url }).run()
				event.target.value = ''
			}
		}
	}

	let activeToolbar = null
	if (editor?.isActive('super-image')) {
		activeToolbar = <ImageToolbar editor={editor} />
	} else if (
		!editor?.isActive('super-image') &&
		!editor?.isActive('video-embed') &&
		!editor?.isActive('visual-bookmark')
	) {
		activeToolbar = <EditorToolbar editor={editor} />
	}

	return (
		<>
			<div className='editor-wrapper flex h-auto min-h-max w-full items-start justify-center'>
				{editor && (
					<>
						<BubbleMenu editor={editor}>{activeToolbar}</BubbleMenu>
						<FloatingMenu editor={editor}>
							<EditorFloatingMenu
								editor={editor}
								fileUploadInputRef={fileUploadInputRef}
							/>
							<input
								accept='image/*'
								className='hidden'
								multiple={false}
								onChange={uploadImage}
								ref={fileUploadInputRef}
								type='file'
							/>
						</FloatingMenu>
					</>
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
