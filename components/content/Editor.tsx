import { Box } from '@chakra-ui/react';
import { EditorContent } from '@tiptap/react';

export default function Editor(props) {
	return (
		<Box w='full' h='auto' minH='600px'>
			<EditorContent editor={props?.editor} />
		</Box>
	);
}
