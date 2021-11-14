import { useState } from 'react';
import { chakra, useBoolean } from '@chakra-ui/react';
import { useEditor } from '@tiptap/react';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import TurndownService from 'turndown';
import Container from '../components/Container';
import Header from '../components/Header';
import Main from '../components/content/Main';
import Footer from '../components/Footer';

export default function Index() {
	const [distractionFreeMode, setDistractionFreeMode] = useBoolean(false);
	const [content, setContent] = useState('');
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

	return (
		<Container height='auto' minH='100vh'>
			<Header
				distractionFreeMode={distractionFreeMode}
				downloadAsMarkdown={downloadAsMarkdown}
				isEditorEmpty={editor?.isEmpty}
				setDistractionFreeMode={setDistractionFreeMode}
				session={session}
				setSession={setSession}
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
				<Main editor={editor} setTitle={setTitle} title={title} />
			</chakra.main>
			<Footer
				distractionFreeMode={distractionFreeMode}
				wordCount={wordCount}
			/>
		</Container>
	);
}
