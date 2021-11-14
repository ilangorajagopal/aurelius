import Script from 'next/script';
import {
	Button,
	Flex,
	Grid,
	HStack,
	FormControl,
	FormLabel,
	Icon,
	IconButton,
	Input,
	Link,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	Radio,
	RadioGroup,
	Stack,
	Text,
	Tooltip,
	VStack,
	useColorMode,
	useColorModeValue,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import {
	Download,
	Edit3,
	Eye,
	Moon,
	Settings,
	Square,
	Sun,
	Target,
} from 'react-feather';
import { MdCenterFocusStrong } from 'react-icons/md';
import { useState } from 'react';
import Timer from './Timer';

export default function Header(props) {
	const {
		distractionFreeMode,
		downloadAsMarkdown,
		isEditorEmpty,
		setDistractionFreeMode,
		session,
		setSession,
		wordCount,
	} = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { toggleColorMode: toggleMode } = useColorMode();
	const text = useColorModeValue('dark', 'light');
	const SwitchIcon = useColorModeValue(Moon, Sun);
	// TODO: Save session duration to state and show a modal with total time spent writing in current session
	// const [sessionDuration, setSessionDuration] = useState(0);
	const [sessionGoal, setSessionGoal] = useState('duration');
	const [sessionTarget, setSessionTarget] = useState(0);
	const toast = useToast();

	function startSession() {
		setSession({ goal: sessionGoal, target: sessionTarget });
		setDistractionFreeMode.toggle();
	}

	function endTimedSession(totalTime) {
		// Set total session duration in seconds
		// setSessionDuration(totalTime);
		console.log(totalTime);
		setSession(null);
		setDistractionFreeMode.toggle();
	}

	function endWordCountSession() {
		console.log(wordCount);
		setSession(null);
		setDistractionFreeMode.toggle();
	}

	let sessionComponent = null;
	if (session && session?.goal === 'duration') {
		const time = new Date();
		time.setSeconds(time.getSeconds() + 60 * session?.target);
		sessionComponent = (
			<Timer
				endTimedSession={endTimedSession}
				expiry={time}
				target={session?.target}
			/>
		);
	} else if (session && session?.goal === 'word-count') {
		sessionComponent = (
			<HStack align='center' justify='center' spacing={2}>
				<Tooltip label='End Session'>
					<IconButton
						aria-label='stop session timer'
						bg='transparent'
						p={0}
						size='xs'
						icon={<Square width={14} height={14} />}
						onClick={endWordCountSession}
					/>
				</Tooltip>
				<Text
					fontSize='sm'
					ml={2}
				>{`${wordCount} / ${sessionTarget}`}</Text>
			</HStack>
		);
	} else {
		sessionComponent = (
			<Popover>
				<PopoverTrigger>
					<Button size='sm'>New Session</Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverBody p={4}>
						<VStack w='full' spacing={4}>
							<FormControl
								d='grid'
								gridTemplateColumns='repeat(2, 1fr)'
							>
								<FormLabel fontSize='md' htmlFor='session-goal'>
									Session Goal
								</FormLabel>
								<RadioGroup
									defaultValue={sessionGoal}
									fontSize='sm'
									name='session-goal'
									onChange={(e) => setSessionGoal(e)}
								>
									<Stack spacing={2} direction='column'>
										<Radio value='duration'>
											<Text fontSize='sm'>Duration</Text>
										</Radio>
										<Radio value='word-count'>
											<Text fontSize='sm'>
												Word Count
											</Text>
										</Radio>
									</Stack>
								</RadioGroup>
							</FormControl>
							{sessionGoal === 'duration' ? (
								<FormControl
									d='grid'
									gridTemplateColumns='repeat(2, 1fr)'
								>
									<FormLabel
										fontSize='md'
										htmlFor='session-duration'
									>
										Target
									</FormLabel>
									<HStack spacing={2}>
										<Input
											name='session-duration'
											defaultValue={sessionTarget}
											onChange={(e) =>
												setSessionTarget(
													parseInt(e.target.value, 10)
												)
											}
										/>
										<Text fontSize='sm'>minutes</Text>
									</HStack>
								</FormControl>
							) : (
								<FormControl
									d='grid'
									gridTemplateColumns='repeat(2, 1fr)'
								>
									<FormLabel
										fontSize='md'
										htmlFor='session-word-count'
									>
										Target
									</FormLabel>
									<HStack spacing={2}>
										<Input
											name='session-word-count'
											defaultValue={sessionTarget}
											onChange={(e) =>
												setSessionTarget(
													parseInt(e.target.value, 10)
												)
											}
										/>
										<Text fontSize='sm'>words</Text>
									</HStack>
								</FormControl>
							)}
						</VStack>
					</PopoverBody>
					<PopoverFooter>
						<HStack w='full' justifyContent='end' spacing={4}>
							<Button
								colorScheme='brand'
								onClick={startSession}
								size='sm'
							>
								Start
							</Button>
						</HStack>
					</PopoverFooter>
				</PopoverContent>
			</Popover>
		);
	}

	return (
		<Flex
			as='header'
			w='full'
			h={16}
			px={6}
			alignItems='center'
			justifyContent='space-between'
			overflowY='hidden'
			opacity={distractionFreeMode ? '0.1' : '1'}
			_hover={{ opacity: 1 }}
		>
			<Grid w='full' h='full' templateColumns='repeat(3, 1fr)' gap={4}>
				{/* Logo */}
				<Flex
					align='center'
					justifyContent='start'
					fontSize='xl'
					fontWeight='bold'
					color={useColorModeValue('gray.900', 'white')}
				>
					<Link href='/'>Logo</Link>
				</Flex>

				{/* Tools */}
				<HStack
					h='full'
					py={4}
					align='center'
					justifyContent='center'
					fontSize='xl'
					fontWeight='bold'
					color={useColorModeValue('gray.900', 'white')}
				>
					<Button
						w={10}
						h={10}
						p={0}
						rounded='md'
						d='flex'
						align='center'
						justify='center'
						onClick={setDistractionFreeMode.toggle}
						variant='ghost'
					>
						<Icon as={MdCenterFocusStrong} />
					</Button>

					<Button
						w={10}
						h={10}
						p={0}
						rounded='md'
						d='flex'
						align='center'
						justify='center'
						variant='ghost'
					>
						<Icon as={Eye} />
					</Button>

					<Button
						w={10}
						h={10}
						p={0}
						rounded='md'
						d='flex'
						align='center'
						justify='center'
						variant='ghost'
					>
						<Icon as={Edit3} />
					</Button>
				</HStack>

				{/* Settings & Account */}
				<HStack
					h='full'
					align='center'
					justifyContent='end'
					fontSize='xl'
					fontWeight='bold'
					color={useColorModeValue('gray.900', 'white')}
					spacing={4}
				>
					{sessionComponent}

					<>
						<Button
							w={10}
							h={10}
							p={0}
							rounded='md'
							d='flex'
							align='center'
							justify='center'
							onClick={() => {
								if (!isEditorEmpty) {
									onOpen();
									downloadAsMarkdown();
								} else {
									toast({
										duration: 2000,
										position: 'top',
										status: 'info',
										title: 'No content to export',
									});
								}
							}}
							variant='ghost'
						>
							<Icon as={Download} />
						</Button>

						<Modal
							isCentered={true}
							isOpen={isOpen}
							onClose={onClose}
						>
							<ModalOverlay />
							<ModalContent px={6} py={8}>
								<ModalBody>
									<VStack
										align='center'
										justify='center'
										color={useColorModeValue(
											'gray.900',
											'white'
										)}
										textAlign='center'
										spacing={4}
									>
										<Text fontSize='7xl'>🎉</Text>

										<Text
											fontSize='lg'
											fontWeight='semibold'
										>
											Markdown Generated!
										</Text>

										<Text>
											Thanks for using The Writing App!
											Feel free to reach out to me on{' '}
											<Link
												color='brand.200'
												href='https://twitter.com/_ilango'
												isExternal={true}
											>
												Twitter
											</Link>{' '}
											with any feedback.
										</Text>

										<Text>
											If you found this product helpful,
											consider writing a few words about
											us on Twitter!
										</Text>

										<a
											href='https://twitter.com/share?ref_src=twsrc%5Etfw'
											className='twitter-share-button'
											data-size='large'
											data-text='Writing in The Writing App is such a joy! 🤩 It helps me focus and be consistent with my writing habit. Try it for yourself 👇️'
											data-url='https://thewritingapp.opencatalysts.tech/'
											data-related='_ilango,opencatalysts'
											data-lang='en'
											data-dnt='true'
											data-show-count='false'
										>
											Share on Twitter
										</a>
										<Script src='https://platform.twitter.com/widgets.js' />
									</VStack>
								</ModalBody>
							</ModalContent>
						</Modal>
					</>

					{/*<>*/}
					{/*	<Button*/}
					{/*		w={10}*/}
					{/*		h={10}*/}
					{/*		p={0}*/}
					{/*		rounded='md'*/}
					{/*		d='flex'*/}
					{/*		align='center'*/}
					{/*		justify='center'*/}
					{/*		onClick={onOpen}*/}
					{/*		variant='ghost'*/}
					{/*	>*/}
					{/*		<Icon as={Settings} />*/}
					{/*	</Button>*/}

					{/*	<Modal*/}
					{/*		isCentered={true}*/}
					{/*		isOpen={isOpen}*/}
					{/*		onClose={onClose}*/}
					{/*	>*/}
					{/*		<ModalOverlay />*/}
					{/*		<ModalContent>*/}
					{/*			<ModalHeader>Modal Title</ModalHeader>*/}
					{/*			<ModalCloseButton />*/}
					{/*			<ModalBody>Modal Content</ModalBody>*/}

					{/*			<ModalFooter>*/}
					{/*				<Button*/}
					{/*					variant='ghost'*/}
					{/*					mr={3}*/}
					{/*					onClick={onClose}*/}
					{/*				>*/}
					{/*					Close*/}
					{/*				</Button>*/}
					{/*				<Button colorScheme='brand'>Save</Button>*/}
					{/*			</ModalFooter>*/}
					{/*		</ModalContent>*/}
					{/*	</Modal>*/}
					{/*</>*/}

					<Button
						aria-label={`Switch to ${text} mode`}
						w={10}
						h={10}
						p={0}
						rounded='md'
						d='flex'
						align='center'
						justify='center'
						onClick={toggleMode}
						variant='ghost'
					>
						<Icon as={SwitchIcon} />
					</Button>

					<Button colorScheme='brand' size='sm'>
						Sign In
					</Button>
				</HStack>
			</Grid>
		</Flex>
	);
}
