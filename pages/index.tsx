import React, { useCallback, useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import {
	chakra,
	Button,
	Flex,
	HStack,
	Text,
	useBoolean,
	useToast,
} from '@chakra-ui/react';
import { useEditor } from '@tiptap/react';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { Autosave } from 'react-autosave';
import {
	deleteFromStorage,
	useLocalStorage,
	writeStorage,
} from '@rehooks/local-storage';
import Container from '../components/Container';
import Header from '../components/Header';
import Main from '../components/content/Main';
import Footer from '../components/Footer';
import {
	downloadAsMarkdown,
	fetchUserProfile,
	savePostToDB,
	saveSessionToDB,
	uploadImageToS3,
} from '../lib/utils';

export default function Index(props) {
	const { user: authenticatedUser } = props;
	const [distractionFreeMode, setDistractionFreeMode] = useBoolean(false);
	const [musicPlaying, setMusicPlaying] = useBoolean(false);
	const { data: authSession } = useSession();
	const [content, setContent] = useState('');
	const [localPost] = useLocalStorage('aurelius_guest_user_post');
	let localSaveTimeout: any = null;
	const [post, setPost] = useState(null);
	const [isPublishing, setIsPublishing] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [session, setSession] = useState(null);
	const [title, setTitle] = useState('');
	const [profile, setProfile] = useState(null);
	const [wordCount, setWordCount] = useState(0);
	const toast = useToast({
		containerStyle: {
			width: '960px',
			maxWidth: '100%',
			height: '4rem',
			marginTop: '3rem',
		},
		duration: null,
		isClosable: false,
		position: 'top',
	});
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
			const html = editor.getHTML();
			setContent(html);
			updateEditorWordCount(editor.state.doc.textContent);
		},
	});

	useEffect(() => {
		async function fetchProfile() {
			const { user } = await fetchUserProfile(authenticatedUser?.id);
			setProfile(user);
		}

		if (authSession) {
			toast.closeAll();
			fetchProfile().then(() => console.log('Profile fetched...'));
		}

		if (editor && localPost) {
			toast({
				render: () => (
					<Flex
						w='full'
						h='full'
						alignItems='center'
						justifyContent='space-between'
						color='white'
						p={4}
						bg='blue.800'
						rounded='lg'
					>
						<Text>
							We found your post from a previous session. Do you
							want to load it?
						</Text>
						<HStack spacing={4}>
							<Button
								colorScheme='brand'
								onClick={loadLocalPost}
								size='sm'
							>
								Load Saved Post
							</Button>
							<Button
								colorScheme='red'
								onClick={deleteLocalPost}
								size='sm'
							>
								Discard Post
							</Button>
						</HStack>
					</Flex>
				),
			});
		}
	}, [authSession]);

	useEffect(() => {
		return function () {
			clearTimeout(localSaveTimeout);
		};
	}, []);

	function updateEditorWordCount(content) {
		const wordCount = content.split(' ').length;
		setWordCount(wordCount);
	}

	async function uploadImage(event) {
		const imageFile = event.target.files[0];
		if (imageFile) {
			const formData = new FormData();
			formData.append(imageFile.name, imageFile);

			const { url } = await uploadImageToS3(formData);
			if (url) {
				editor.chain().focus().setImage({ src: url }).run();
			}
		}
	}

	function downloadFile() {
		downloadAsMarkdown(title, content);
	}

	const autoSavePost = useCallback(savePost, []);

	const autoSaveData = { post, title, content, word_count: wordCount };

	async function savePost(data) {
		if (data.title && data.content && data.word_count) {
			setIsSaving(true);
			const update = {
				title: data.title,
				content: data.content,
				word_count: data.word_count,
			};
			if (authenticatedUser) {
				const { data: postData } = await savePostToDB(
					data.post,
					update,
					authenticatedUser.id
				);
				if (postData) {
					setPost(postData);
				}
				setIsSaving(false);
			} else {
				localSaveTimeout = setTimeout(() => {
					writeStorage('aurelius_guest_user_post', update);
					setIsSaving(false);
				}, 2000);
			}
		}
	}

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

	function loadLocalPost() {
		if (editor && localPost) {
			const data = JSON.parse(localPost);
			setTitle(data?.title);
			setContent(data?.content);
			if (editor.isEmpty) {
				editor.commands.setContent(data?.content);
				updateEditorWordCount(editor.state.doc.textContent);
			}
			if (authenticatedUser) {
				deleteLocalPost();
			}
			toast.closeAll();
		}
	}

	function deleteLocalPost() {
		deleteFromStorage('aurelius_guest_user_post');
		toast.closeAll();
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
				<Autosave
					data={autoSaveData}
					interval={5000}
					onSave={autoSavePost}
				/>
				<Main
					editor={editor}
					setTitle={setTitle}
					title={title}
					uploadImage={uploadImage}
				/>
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

	if (!session) {
		return {
			props: {},
		};
	}

	return {
		props: {
			user: { ...session.user, id: session.userId },
		},
	};
}
