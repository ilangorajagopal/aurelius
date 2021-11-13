import { useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Title from './Title';
import Editor from './Editor';

export default function Main(props) {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
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
			StarterKit,
		],
		onUpdate() {
			const html = this.getHTML();
			setContent(html);
		},
	});

	return (
		<VStack w='full' maxW='container.md' spacing={4}>
			{/*<Toolbar editor={editor} />*/}
			<Title title={title} setTitle={setTitle} />
			<Editor editor={editor} />
		</VStack>
	);
}
