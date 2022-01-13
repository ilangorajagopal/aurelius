import { VStack } from '@chakra-ui/react';
import Title from './Title';
import Editor from './Editor';

export default function Main(props) {
	const { editor, setTitle, title, uploadImage } = props;

	return (
		<VStack w='full' maxW='container.md' spacing={4}>
			{/*<Toolbar editor={editor} />*/}
			<Title title={title} setTitle={setTitle} />
			<Editor editor={editor} uploadImage={uploadImage} />
		</VStack>
	);
}
