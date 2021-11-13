import { useRef, useState } from 'react';
import {
	Button,
	Heading,
	HStack,
	Icon,
	IconButton,
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
import {
	FaBold,
	FaCode,
	FaHeading,
	FaItalic,
	FaLink,
	FaQuoteRight,
} from 'react-icons/fa';

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
		<HStack
			bg={useColorModeValue('gray.100', 'gray.400')}
			shadow='lg'
			rounded='md'
			w='auto'
			spacing={2}
		>
			<Menu>
				<MenuButton
					as={IconButton}
					icon={<FaHeading />}
					bg='transparent'
					color={useColorModeValue('gray.900', 'gray.100')}
					p={0}
					d='flex'
					alignItems='center'
					justifyContent='center'
				/>
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
				p={0}
				d='flex'
				alignItems='center'
				justifyContent='center'
			>
				<Icon as={FaBold} />
			</Button>
			<Button
				bg='transparent'
				color={useColorModeValue('gray.900', 'gray.100')}
				onClick={() => editor.chain().focus().toggleItalic().run()}
				p={0}
				d='flex'
				alignItems='center'
				justifyContent='center'
			>
				<Icon as={FaItalic} />
			</Button>
			<Button
				bg='transparent'
				color={useColorModeValue('gray.900', 'gray.100')}
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				p={0}
				d='flex'
				alignItems='center'
				justifyContent='center'
			>
				<Icon as={FaQuoteRight} />
			</Button>
			<Popover initialFocusRef={linkInputRef}>
				<PopoverTrigger>
					<Button
						bg='transparent'
						color={useColorModeValue('gray.900', 'gray.100')}
					>
						<Icon as={FaLink} />
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
				<Icon as={FaCode} />
			</Button>
		</HStack>
	);
}
