import NextLink from 'next/link';
import Script from 'next/script';
import {
	Avatar,
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
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
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
	Switch,
	Tag,
	Text,
	Tooltip,
	VStack,
	useColorMode,
	useColorModeValue,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { Download, Edit3, Moon, Square, Sun, User } from 'react-feather';
import { MdCenterFocusStrong, MdOutlineSpaceDashboard } from 'react-icons/md';
import { useState } from 'react';
import Timer from './Timer';
import { useRouter } from 'next/router';

export default function Header(props) {
	const {
		authSession,
		downloadAsMarkdown,
		isEditorEmpty,
		isSaving,
		distractionFreeMode,
		setDistractionFreeMode,
		setMusicPlaying,
		session,
		setSession,
		wordCount,
		onAuthModalOpen,
		onSettingsModalOpen,
	} = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode, toggleColorMode: toggleMode } = useColorMode();
	const text = useColorModeValue('dark', 'light');
	const SwitchIcon = useColorModeValue(Moon, Sun);
	const { pathname } = useRouter();
	// TODO: Save session duration to state and show a modal with total time spent writing in current session
	// const [sessionDuration, setSessionDuration] = useState(0);
	const [sessionGoal, setSessionGoal] = useState('duration');
	const [sessionTarget, setSessionTarget] = useState(0);
	const [sessionMusic, setSessionMusic] = useState(false);
	const toast = useToast();

	function startSession() {
		setSession({ goal: sessionGoal, target: sessionTarget });
		setDistractionFreeMode.toggle();
		if (sessionMusic) {
			setMusicPlaying.on();
		}
	}

	function endTimedSession(totalTime) {
		// Set total session duration in seconds
		// setSessionDuration(totalTime);
		console.log(totalTime);
		setSession(null);
		setDistractionFreeMode.toggle();
		if (sessionMusic) {
			setMusicPlaying.off();
		}
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
				music={sessionMusic}
				setMusicPlaying={setMusicPlaying}
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
							<FormControl
								d='grid'
								gridTemplateColumns='repeat(2, 1fr)'
							>
								<FormLabel
									fontSize='md'
									htmlFor='session-music'
								>
									Music
								</FormLabel>
								<Switch
									defaultChecked={false}
									id='session-music'
									onChange={(e) =>
										setSessionMusic(e.target.checked)
									}
									checked={sessionMusic}
								/>
							</FormControl>
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
		>
			<Grid w='full' h='full' templateColumns='repeat(3, 1fr)' gap={4}>
				{/* Logo */}
				<Flex
					align='center'
					justifyContent='start'
					fontSize='xl'
					fontWeight='bold'
					color={useColorModeValue('gray.900', 'white')}
					opacity={distractionFreeMode ? '0.1' : '1'}
					_hover={{ opacity: 1 }}
				>
					<NextLink href='/'>The Writing App</NextLink>
					<Tag ml={4}>Beta</Tag>
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
					opacity={distractionFreeMode ? '0.1' : '1'}
					_hover={{ opacity: 1 }}
				>
					{authSession ? (
						<HStack spacing={4}>
							<NextLink href='/'>
								<Button
									colorScheme={
										pathname === '/' ? 'brand' : ''
									}
									size='sm'
									px={4}
									variant={
										pathname !== '/' ? 'ghost' : 'solid'
									}
								>
									<Edit3 width={14} height={14} />
									<Text fontSize='sm' ml={2}>
										Write
									</Text>
								</Button>
							</NextLink>

							<NextLink href='/dashboard'>
								<Button
									colorScheme={
										pathname === '/dashboard' ? 'brand' : ''
									}
									size='sm'
									px={4}
									variant={
										pathname !== '/dashboard'
											? 'ghost'
											: 'solid'
									}
								>
									<MdOutlineSpaceDashboard
										width={14}
										height={14}
									/>
									<Text fontSize='sm' ml={2}>
										Dashboard
									</Text>
								</Button>
							</NextLink>

							{/*<NextLink href='/analytics'>*/}
							{/*	<Button size='sm' px={4} variant='ghost'>*/}
							{/*		<BarChart2 width={14} height={14} />*/}
							{/*		<Text fontSize='sm' ml={2}>Analytics</Text>*/}
							{/*		<Tag ml={2}>Coming Soon</Tag>*/}
							{/*	</Button>*/}
							{/*</NextLink>*/}
						</HStack>
					) : null}
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
					opacity={distractionFreeMode ? '0.1' : '1'}
					_hover={{ opacity: 1 }}
				>
					{isSaving ? <Text fontSize='sm'>Saving...</Text> : null}

					{sessionComponent}

					{pathname === '/' && !authSession ? (
						<>
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
													Thanks for using The Writing
													App! Feel free to reach out
													to me on{' '}
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
													If you found this product
													helpful, consider writing a
													few words about us on
													Twitter!
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
						</>
					) : null}

					{authSession ? (
						<Menu>
							<MenuButton
								as={Button}
								p={0}
								bg='transparent'
								_hover={{ bg: 'transparent' }}
								_active={{ bg: 'transparent' }}
								_focus={{ bg: 'transparent' }}
							>
								<Avatar
									icon={<User width={16} height={16} />}
									size='sm'
								/>
							</MenuButton>
							<MenuList p={0}>
								<MenuItem w='full' h={10}>
									<Text fontSize='sm'>About</Text>
								</MenuItem>
								<MenuItem d='none'>What&apos;s New</MenuItem>
								<MenuItem
									w='full'
									h={10}
									onClick={onSettingsModalOpen}
								>
									<Text fontSize='sm'>Settings</Text>
								</MenuItem>
								<MenuDivider m={0} />
								<MenuItem
									w='full'
									h={10}
									d='flex'
									alignItems='center'
									justifyContent='space-between'
								>
									<Text fontSize='sm'>Dark Mode</Text>
									<Switch
										defaultChecked={colorMode === 'dark'}
										onChange={toggleMode}
										size='sm'
									/>
								</MenuItem>
								<MenuDivider m={0} />
								<MenuItem w='full' h={10}>
									<Text fontSize='sm'>Sign Out</Text>
								</MenuItem>
							</MenuList>
						</Menu>
					) : (
						<Button
							colorScheme='brand'
							onClick={onAuthModalOpen}
							size='sm'
						>
							Sign In
						</Button>
					)}
				</HStack>
			</Grid>
		</Flex>
	);
}
