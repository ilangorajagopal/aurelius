import { useRef, useState } from 'react';
import {
	Button,
	Heading,
	HStack,
	Icon,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Popover,
	PopoverContent,
	PopoverTrigger,
	useColorModeValue,
} from '@chakra-ui/react';
import { Bold, Code, Italic, Link, List } from 'react-feather';
import { FaFileCode, FaHeading, FaListOl, FaQuoteRight } from 'react-icons/fa';

export default function Toolbar({ editor }) {
	const [link, setLink] = useState('');
	const linkInputRef = useRef();

	function linkChangeHandler(e) {
		if (e.key === 'Enter' || e.keyCode === 13) {
			// Call tiptap's link extension
			editor
				.chain()
				.focus()
				.extendMarkRange('link')
				.setLink({ href: link })
				.run();
			setLink('');
		}
	}

	return (
		<HStack w='full' spacing={2} mb={4}>
			<Menu>
				<MenuButton
					as={Button}
					bg='transparent'
					color={useColorModeValue('gray.900', 'gray.100')}
				>
					<Icon as={FaHeading} />
				</MenuButton>
				<MenuList>
					<MenuItem
						onClick={() =>
							editor
								.chain()
								.focus()
								.toggleHeading({ level: 1 })
								.run()
						}
					>
						<Heading as='h1' size='lg'>
							Heading 1
						</Heading>
					</MenuItem>
					<MenuItem
						onClick={() =>
							editor
								.chain()
								.focus()
								.toggleHeading({ level: 2 })
								.run()
						}
					>
						<Heading as='h2' size='md'>
							Heading 2
						</Heading>
					</MenuItem>
					<MenuItem
						onClick={() =>
							editor
								.chain()
								.focus()
								.toggleHeading({ level: 3 })
								.run()
						}
					>
						<Heading as='h3' size='sm'>
							Heading 3
						</Heading>
					</MenuItem>
				</MenuList>
			</Menu>
			<Button
				bg='transparent'
				color={useColorModeValue('gray.900', 'gray.100')}
				onClick={() => editor.chain().focus().toggleBold().run()}
			>
				<Icon as={Bold} />
			</Button>
			<Button
				bg='transparent'
				color={useColorModeValue('gray.900', 'gray.100')}
				onClick={() => editor.chain().focus().toggleItalic().run()}
			>
				<Icon as={Italic} />
			</Button>
			<Button
				bg='transparent'
				color={useColorModeValue('gray.900', 'gray.100')}
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
			>
				<Icon as={FaListOl} />
			</Button>
			<Button
				bg='transparent'
				color={useColorModeValue('gray.900', 'gray.100')}
				onClick={() => editor.chain().focus().toggleBulletList().run()}
			>
				<Icon as={List} />
			</Button>
			<Button
				bg='transparent'
				color={useColorModeValue('gray.900', 'gray.100')}
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
			>
				<Icon as={FaQuoteRight} />
			</Button>
			<Popover initialFocusRef={linkInputRef}>
				<PopoverTrigger>
					<Button
						bg='transparent'
						color={useColorModeValue('gray.900', 'gray.100')}
					>
						<Icon as={Link} />
					</Button>
				</PopoverTrigger>
				<PopoverContent p={4}>
					<Input
						ref={linkInputRef}
						value={link}
						onChange={(e) => setLink(e.target.value)}
						onKeyUp={linkChangeHandler}
					/>
				</PopoverContent>
			</Popover>
			<Button
				bg='transparent'
				color={useColorModeValue('gray.900', 'gray.100')}
				onClick={() => editor.chain().focus().toggleCode().run()}
			>
				<Icon as={Code} />
			</Button>
			<Button
				bg='transparent'
				color={useColorModeValue('gray.900', 'gray.100')}
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
			>
				<Icon as={FaFileCode} />
			</Button>
		</HStack>
	);
}
