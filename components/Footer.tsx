import {
	Button,
	Flex,
	Grid,
	HStack,
	Icon,
	IconButton,
	Text,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import ReactPlayer from 'react-player/youtube';
import { Info, Music, Pause } from 'react-feather';
import { useRouter } from 'next/router';
import About from './About';

export default function Footer(props) {
	const {
		authSession,
		distractionFreeMode,
		musicPlaying,
		setMusicPlaying,
		wordCount,
	} = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { pathname } = useRouter();

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
		>
			<Grid w='full' h='full' templateColumns='repeat(2, 1fr)' gap={4}>
				{/* Details */}
				<HStack
					h='full'
					alignItems='center'
					justifyContent='start'
					fontSize='xl'
					fontWeight='bold'
					color={useColorModeValue('gray.900', 'white')}
					opacity={distractionFreeMode ? '0.1' : '1'}
					_hover={{ opacity: 1 }}
				>
					{pathname === '/' || pathname.startsWith('/edit') ? (
						<Text fontSize='xs' fontWeight='light'>
							{`Words: ${wordCount}`}
						</Text>
					) : null}
				</HStack>

				<HStack
					h='full'
					alignItems='center'
					justifyContent='end'
					opacity={distractionFreeMode ? '0.1' : '1'}
					_hover={{ opacity: 1 }}
				>
					{pathname === '/' || pathname.startsWith('/edit') ? (
						<>
							{/* Music Player */}
							{musicPlaying ? (
								<IconButton
									aria-label='pause session timer'
									bg='transparent'
									p={0}
									size='xs'
									icon={<Pause width={14} height={14} />}
									onClick={setMusicPlaying?.off}
								/>
							) : (
								<IconButton
									aria-label='resume session timer'
									bg='transparent'
									p={0}
									size='xs'
									icon={<Music width={14} height={14} />}
									onClick={setMusicPlaying?.on}
								/>
							)}
							<ReactPlayer
								playing={musicPlaying}
								url='https://www.youtube.com/watch?v=5qap5aO4i9A'
								width='0px'
								height='0px'
							/>
						</>
					) : null}

					{/* About */}
					{!authSession ? (
						<Flex
							alignItems='center'
							justifyContent='end'
							fontSize='xl'
							fontWeight='bold'
							color={useColorModeValue('gray.900', 'white')}
						>
							<>
								<Button
									aria-label='About Aurelius'
									w='auto'
									minW={0}
									h='auto'
									p={0}
									rounded='md'
									d='flex'
									alignItems='center'
									justifyContent='center'
									onClick={onOpen}
									variant='ghost'
								>
									<Icon as={Info} />
								</Button>

								<About
									isAboutModalOpen={isOpen}
									onAboutModalClose={onClose}
								/>
							</>
						</Flex>
					) : null}
				</HStack>
			</Grid>
		</Flex>
	);
}
