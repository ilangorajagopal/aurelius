import { useEffect } from 'react';
import {
	Button,
	Flex,
	Grid,
	HStack,
	Icon,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import ReactPlayer from 'react-player/youtube';
import { Info, Music, Pause, Play } from 'react-feather';

export default function Footer(props) {
	const { distractionFreeMode, musicPlaying, setMusicPlaying, wordCount } =
		props;
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		if (navigator) {
			navigator?.mediaSession?.setActionHandler(
				'play',
				setMusicPlaying.on
			);
			navigator?.mediaSession?.setActionHandler(
				'pause',
				setMusicPlaying.off
			);
		}
	}, []);

	return (
		<Flex
			as='footer'
			w='full'
			h={12}
			px={6}
			alignItems='center'
			justifyContent='space-between'
			flexShrink={0}
			overflowY='hidden'
			opacity={distractionFreeMode ? '0.1' : '1'}
			_hover={{ opacity: 1 }}
		>
			<Grid w='full' h='full' templateColumns='repeat(2, 1fr)' gap={4}>
				{/* Details */}
				<HStack
					h='full'
					align='center'
					justifyContent='start'
					fontSize='xl'
					fontWeight='bold'
					color={useColorModeValue('gray.900', 'white')}
				>
					<Text fontSize='xs' fontWeight='light'>
						{`Words: ${wordCount}`}
					</Text>
				</HStack>

				<HStack h='full' align='center' justify='end'>
					{/* Music Player */}
					{musicPlaying ? (
						<IconButton
							aria-label='pause session timer'
							bg='transparent'
							p={0}
							size='xs'
							icon={<Pause width={14} height={14} />}
							onClick={setMusicPlaying.off}
						/>
					) : (
						<IconButton
							aria-label='resume session timer'
							bg='transparent'
							p={0}
							size='xs'
							icon={<Music width={14} height={14} />}
							onClick={setMusicPlaying.on}
						/>
					)}
					<ReactPlayer
						playing={musicPlaying}
						url='https://www.youtube.com/watch?v=fR9BUCk79-Y'
						width='0px'
						height='0px'
					/>

					{/* About */}
					<Flex
						align='center'
						justifyContent='end'
						fontSize='xl'
						fontWeight='bold'
						color={useColorModeValue('gray.900', 'white')}
					>
						<>
							<Button
								w='auto'
								minW={0}
								h='auto'
								p={0}
								rounded='md'
								d='flex'
								align='center'
								justify='center'
								onClick={onOpen}
								variant='ghost'
							>
								<Icon as={Info} />
							</Button>

							<Modal
								isCentered={true}
								isOpen={isOpen}
								onClose={onClose}
							>
								<ModalOverlay />
								<ModalContent>
									<ModalHeader>Modal Title</ModalHeader>
									<ModalCloseButton />
									<ModalBody>Modal Content</ModalBody>

									<ModalFooter>
										<Button
											variant='ghost'
											mr={3}
											onClick={onClose}
										>
											Close
										</Button>
										<Button colorScheme='brand'>
											Save
										</Button>
									</ModalFooter>
								</ModalContent>
							</Modal>
						</>
					</Flex>
				</HStack>
			</Grid>
		</Flex>
	);
}
