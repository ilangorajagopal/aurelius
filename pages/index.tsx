import { useCallback, useEffect, useState } from 'react';
import {
	chakra,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	useBoolean,
	useDisclosure,
} from '@chakra-ui/react';
import { useEditor } from '@tiptap/react';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { Autosave } from 'react-autosave';
import TurndownService from 'turndown';
import Container from '../components/Container';
import Header from '../components/Header';
import Main from '../components/content/Main';
import Footer from '../components/Footer';
import AuthBasic from '../components/Auth';
import { supabase } from '../lib/supabase';
import { savePostToDB } from '../lib/utils';

export default function Index() {
	const [distractionFreeMode, setDistractionFreeMode] = useBoolean(false);
	const [musicPlaying, setMusicPlaying] = useBoolean(false);
	const {
		isOpen: isAuthModalOpen,
		onOpen: onAuthModalOpen,
		onClose: onAuthModalClose,
	} = useDisclosure();
	const [authSession, setAuthSession] = useState(null);
	const [content, setContent] = useState('');
	const [post, setPost] = useState(null);
	const [isSaving, setIsSaving] = useState(false);
	const [session, setSession] = useState(null);
	const [title, setTitle] = useState('');
	const [wordCount, setWordCount] = useState(0);
	const editor = useEditor({
		content,
		editorProps: {
			attributes: {
				class: '',
			},
		},
		extensions: [
			BubbleMenu.configure({
				tippyOptions: {
					arrow: true,
				},
			}),
			Image.configure({}),
			Link.configure({ openOnClick: false }),
			Placeholder.configure({
				placeholder: 'Start writing...',
			}),
			StarterKit.configure({
				heading: { levels: [1, 2, 3] },
			}),
		],
		onUpdate({ editor }) {
			const wordCount = editor.state.doc.textContent.split(' ').length;
			const html = this.getHTML();
			setContent(html);
			setWordCount(wordCount);
		},
	});

	useEffect(() => {
		setAuthSession(supabase.auth.user());

		supabase.auth.onAuthStateChange((event, session) => {
			setAuthSession(session);
		});
	}, [authSession]);

	function downloadAsMarkdown() {
		const htmlContent = `<h1>${title}</h1>${content}`;
		const turndownService = new TurndownService({ headingStyle: 'atx' });
		const markdown = turndownService.turndown(htmlContent);
		const filename = title || `twa_untitled_post_${Date.now()}`;
		const a = document.createElement('a');
		const blob = new Blob([markdown]);
		a.href = URL.createObjectURL(blob);
		a.download = `${filename}.md`;
		a.click();
	}

	const savePost = useCallback(async (data) => {
		if (data.title && data.content && data.word_count) {
			setIsSaving(true);
			const update = {
				title: data.title,
				content: data.content,
				word_count: data.word_count,
			};
			const { data: postData, error } = await savePostToDB(
				data.post,
				update
			);
			if (postData) {
				setPost(postData);
			} else {
				console.log(error);
			}
			setIsSaving(false);
		}
	}, []);

	const autoSaveData = { post, title, content, word_count: wordCount };

	return (
		<Container height='auto' minH='100vh'>
			<Header
				authSession={authSession}
				distractionFreeMode={distractionFreeMode}
				downloadAsMarkdown={downloadAsMarkdown}
				isEditorEmpty={editor?.isEmpty}
				isSaving={isSaving}
				setMusicPlaying={setMusicPlaying}
				setDistractionFreeMode={setDistractionFreeMode}
				session={session}
				setSession={setSession}
				wordCount={wordCount}
				onAuthModalOpen={onAuthModalOpen}
			/>
			<chakra.main
				w='full'
				h='auto'
				d='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='flex-start'
				flex='1 0 auto'
				py={16}
			>
				{authSession ? (
					<Autosave
						data={autoSaveData}
						interval={30000}
						onSave={savePost}
					/>
				) : null}
				<Main editor={editor} setTitle={setTitle} title={title} />
			</chakra.main>
			<Footer
				distractionFreeMode={distractionFreeMode}
				musicPlaying={musicPlaying}
				setMusicPlaying={setMusicPlaying}
				wordCount={wordCount}
			/>
			<Modal
				isCentered={true}
				isOpen={isAuthModalOpen}
				onClose={onAuthModalClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalBody>
						<AuthBasic />
					</ModalBody>
				</ModalContent>
			</Modal>
		</Container>
	);
}
