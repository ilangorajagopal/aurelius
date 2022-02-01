import { useRef } from 'react';
import {
	Box,
	IconButton,
	Input,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Text,
} from '@chakra-ui/react';
import { BubbleMenu, EditorContent, FloatingMenu } from '@tiptap/react';
import { Image, Plus, Twitter, Youtube } from 'react-feather';
import Toolbar from './Toolbar';

export default function Editor(props) {
	const { editor, uploadImage } = props;
	const fileUploadInputRef = useRef(null);

	function selectImageFile() {
		fileUploadInputRef?.current?.click();
	}

	function showEmbedComponent(source) {
		editor.chain().focus().setEmbedUrl({ source }).run();
	}

	return (
		<Box w='full' h='auto' minH='600px'>
			{editor && (
				<>
					<BubbleMenu editor={editor}>
						<Toolbar editor={editor} />
					</BubbleMenu>
					<FloatingMenu editor={editor}>
						<Menu>
							<MenuButton
								as={IconButton}
								icon={<Plus width={20} height={20} />}
								p={0}
								w={8}
								minW={8}
								h={8}
								borderWidth={1}
								borderStyle='solid'
								rounded='full'
								variant='ghost'
								position='absolute'
								top='-1.1rem'
								left='-4.2rem'
							/>
							<MenuList p={0}>
								<MenuItem
									w='full'
									h={12}
									onClick={selectImageFile}
								>
									<Image width={16} height={16} />
									<Text ml={4}>Image</Text>
									<Input
										accept='image/*'
										multiple={false}
										opacity={0}
										onChange={uploadImage}
										ref={fileUploadInputRef}
										type='file'
										w={1}
										h={1}
									/>
								</MenuItem>
								{/*<MenuItem*/}
								{/*	w='full'*/}
								{/*	h={12}*/}
								{/*	onClick={() =>*/}
								{/*		showEmbedComponent('youtube')*/}
								{/*	}*/}
								{/*>*/}
								{/*	<Youtube width={16} height={16} />*/}
								{/*	<Text ml={4}>Youtube</Text>*/}
								{/*</MenuItem>*/}
								{/*<MenuItem*/}
								{/*	w='full'*/}
								{/*	h={12}*/}
								{/*	onClick={() =>*/}
								{/*		showEmbedComponent('twitter')*/}
								{/*	}*/}
								{/*>*/}
								{/*	<Twitter width={16} height={16} />*/}
								{/*	<Text ml={4}>Tweet</Text>*/}
								{/*</MenuItem>*/}
							</MenuList>
						</Menu>
					</FloatingMenu>
				</>
			)}
			<EditorContent editor={props?.editor} />
		</Box>
	);
}
