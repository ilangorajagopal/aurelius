import NextImage from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import {
	chakra,
	Flex,
	Link as ChakraLink,
	Modal,
	ModalOverlay,
	ModalCloseButton,
	ModalContent,
	ModalBody,
	Text,
	VStack,
	useBoolean,
	useDisclosure,
	useColorModeValue,
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
import Settings from '../components/Settings';

export default function Index() {
	const [distractionFreeMode, setDistractionFreeMode] = useBoolean(false);
	const [musicPlaying, setMusicPlaying] = useBoolean(false);
	const {
		isOpen: isAuthModalOpen,
		onOpen: onAuthModalOpen,
		onClose: onAuthModalClose,
	} = useDisclosure();
	const {
		isOpen: isSettingsModalOpen,
		onOpen: onSettingsModalOpen,
		onClose: onSettingsModalClose,
	} = useDisclosure();
	const {
		isOpen: isAboutModalOpen,
		onOpen: onAboutModalOpen,
		onClose: onAboutModalClose,
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
		setAuthSession(supabase.auth.session());

		const { data: authListener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				setSession(session);
				fetch('/api/auth', {
					method: 'POST',
					headers: new Headers({
						'Content-Type': 'application/json',
					}),
					credentials: 'same-origin',
					body: JSON.stringify({ event, session }),
				}).then((res) => res.json());
			}
		);

		return () => {
			authListener.unsubscribe();
		};
	}, []);

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
				onSettingsModalOpen={onSettingsModalOpen}
				onAboutModalOpen={onAboutModalOpen}
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
					<ModalBody py={6}>
						<Flex
							w='full'
							alignItems='center'
							justifyContent='center'
							mb={8}
						>
							<NextImage
								src='/images/shield.png'
								width={96}
								height={96}
							/>
						</Flex>
						<AuthBasic />
					</ModalBody>
				</ModalContent>
			</Modal>
			<Modal
				isCentered={true}
				isOpen={isSettingsModalOpen}
				onClose={onSettingsModalClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalBody py={6}>
						<Settings />
					</ModalBody>
				</ModalContent>
			</Modal>
			<Modal
				isCentered={true}
				isOpen={isAboutModalOpen}
				onClose={onAboutModalClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody py={6}>
						<VStack
							align='center'
							justify='center'
							color={useColorModeValue('gray.900', 'white')}
							textAlign='center'
							spacing={4}
						>
							<Flex
								w='full'
								alignItems='center'
								justifyContent='center'
							>
								<NextImage
									src='/images/pencil.png'
									width={128}
									height={128}
								/>
							</Flex>

							<Text fontSize='lg' fontWeight='semibold'>
								About The Writing App
							</Text>

							<Text textAlign='left'>
								TWA was born out of a requirement for a writing
								app that suited my needs. After trying many
								writing apps — code editors to note taking app —
								none of them help with maintaining a writing
								habit. Some of them have a poor writing
								experience by doing too much stuff.
							</Text>

							<Text textAlign='left'>
								I wanted a simple writing app that has the
								features for building a writing habit while
								having an enjoyable writing experience. While
								the current state only supports single posts
								suited for articles, I want to support more
								use-cases like book writing, daily journals, and
								more.
							</Text>

							<Text textAlign='left'>
								TWA is heavily inspired by{' '}
								<ChakraLink
									color='brand.200'
									href='https://blurt.app'
									isExternal={true}
								>
									Blurt
								</ChakraLink>
								. It had everything I needed but unfortunately
								it got acquired and is no longer accessible to
								the public. I want to avoid that for TWA. TWA
								will never be acquired. To make that possible,
								I&apos;ll eventually start charging a
								subscription fee for usage.
							</Text>

							<Text textAlign='left'>
								But there are a lot of things that are out of my
								control that might affect my running of TWA. So,
								to prevent any disruption to users, I&apos;m
								making the entire source-code available to the
								public on Github. With a little technical
								know-how, you can host TWA anywhere you like.
							</Text>

							<Text textAlign='left'>
								If you think this is something you&apos;d be
								interested in, follow me on{' '}
								<ChakraLink
									color='brand.200'
									href='https://twitter.com/_ilango'
									isExternal={true}
								>
									Twitter
								</ChakraLink>
								. Feel free to drop a DM and ask me anything
								about TWA.
							</Text>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Container>
	);
}
