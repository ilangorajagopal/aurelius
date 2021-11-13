import { chakra } from '@chakra-ui/react';
import { Container } from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Main from '../components/content/Main';
import { useEditor } from '@tiptap/react';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';

export default function Index() {
	const [content, setContent] = useState('');
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
			Heading.configure({ levels: [1, 2, 3] }),
			Image.configure({}),
			Link.configure({ openOnClick: false }),
			Placeholder.configure({
				placeholder: 'Start writing...',
			}),
			StarterKit,
		],
		onUpdate({ editor }) {
			const wordCount = editor.state.doc.textContent.split(' ').length;
			const html = this.getHTML();
			setContent(html);
			setWordCount(wordCount);
		},
	});

	return (
		<Container height='auto' minH='100vh'>
			<Header />
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
				<Main editor={editor} setTitle={setTitle} title={title} />
			</chakra.main>
			<Footer wordCount={wordCount} />
		</Container>
	);
}
