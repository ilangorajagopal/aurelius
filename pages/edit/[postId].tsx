import { useCallback, useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { chakra, useBoolean } from '@chakra-ui/react';
import { useEditor } from '@tiptap/react';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { Autosave } from 'react-autosave';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Main from '../../components/content/Main';
import Footer from '../../components/Footer';
import {
	downloadAsMarkdown,
	fetchUserProfile,
	savePostToDB,
	saveSessionToDB,
} from '../../lib/utils';
import prisma from '../../prisma';

export default function EditPost(props) {
	const { post: postData, user: authenticatedUser } = props;
	const [distractionFreeMode, setDistractionFreeMode] = useBoolean(false);
	const [musicPlaying, setMusicPlaying] = useBoolean(false);
	const { data: authSession } = useSession();
	const [content, setContent] = useState('');
	const [post, setPost] = useState(postData);
	const [isPublishing, setIsPublishing] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [session, setSession] = useState(null);
	const [title, setTitle] = useState('');
	const [profile, setProfile] = useState(null);
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
		async function fetchProfile() {
			const { user } = await fetchUserProfile(authenticatedUser?.id);
			setProfile(user);
		}

		fetchProfile().then(() => console.log('Profile fetched...'));
	}, [authSession]);

	useEffect(() => {
		if (editor && postData) {
			setTitle(postData.title);
			setContent(postData.content);
			if (editor.isEmpty) {
				editor.commands.setContent(postData.content);
			}
		}
	}, [editor]);

	function downloadFile() {
		downloadAsMarkdown(title, content);
	}

	const savePost = useCallback(async (data) => {
		if (data.title && data.content && data.word_count) {
			setIsSaving(true);
			const update = {
				title: data.title,
				content: data.content,
				word_count: data.word_count,
			};
			const { data: postData } = await savePostToDB(
				data.post,
				update,
				profile
			);
			if (postData) {
				setPost(postData);
			}
			setIsSaving(false);
		}
	}, []);

	const autoSaveData = { post, title, content, word_count: wordCount };

	async function saveSession(totalTime) {
		let update: unknown;
		if (session.goal === 'duration') {
			update = {
				...session,
				target: session.target * 60,
				result: totalTime,
				postId: post?.id,
			};
		} else {
			update = {
				...session,
				result: wordCount,
				postId: post?.id,
			};
		}

		await saveSessionToDB(update, profile);
	}

	async function publishPost() {
		setIsPublishing(true);
		const update = { published: true };
		const { data: postData } = await savePostToDB(
			post,
			update,
			authenticatedUser.id
		);
		if (postData) {
			setPost(postData);
		}
		setIsPublishing(false);
	}

	return (
		<Container height='auto' minH='100vh'>
			<Header
				authSession={authSession}
				distractionFreeMode={distractionFreeMode}
				downloadFile={downloadFile}
				isEditorEmpty={editor?.isEmpty}
				isPublishing={isPublishing}
				isSaving={isSaving}
				publishPost={publishPost}
				saveSession={saveSession}
				setMusicPlaying={setMusicPlaying}
				setDistractionFreeMode={setDistractionFreeMode}
				session={session}
				setSession={setSession}
				user={authenticatedUser}
				wordCount={wordCount}
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
						interval={5000}
						onSave={savePost}
					/>
				) : null}
				<Main editor={editor} setTitle={setTitle} title={title} />
			</chakra.main>
			<Footer
				authSession={authSession}
				distractionFreeMode={distractionFreeMode}
				musicPlaying={musicPlaying}
				setMusicPlaying={setMusicPlaying}
				wordCount={wordCount}
			/>
		</Container>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);
	const post = await prisma.post.findUnique({
		where: {
			id: context.params.postId,
		},
	});

	if (!session) {
		return {
			props: {},
		};
	}

	return {
		props: {
			post: JSON.parse(JSON.stringify(post)),
			user: { ...session.user, id: session.userId },
		},
	};
}
