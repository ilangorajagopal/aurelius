import { Box } from '@chakra-ui/react';
import { BubbleMenu, EditorContent } from '@tiptap/react';
import Toolbar from './Toolbar';

export default function Editor(props) {
	const { editor } = props;

	return (
		<Box w='full' h='auto' minH='600px'>
			{editor && (
				<BubbleMenu editor={editor}>
					<Toolbar editor={editor} />
				</BubbleMenu>
			)}
			<EditorContent editor={props?.editor} />
		</Box>
	);
}
