import Image from 'next/image';
import { getSession, useSession } from 'next-auth/react';
import {
	chakra,
	Button,
	Flex,
	Grid,
	GridItem,
	Heading,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import Container from '../../../components/Container';
import Header from '../../../components/Header';

const writingPaths = [
	{
		id: 'post',
		label: 'A Post',
	},
	{
		id: 'journal',
		label: 'A Journal',
	},
	{
		id: 'notes',
		label: 'Notes',
	},
	{
		id: 'essay',
		label: 'An Essay',
	},
	{
		id: 'newsletter',
		label: 'A Newsletter',
	},
];

export default function AddWritingPath(props) {
	const { user: authenticatedUser } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { data: authSession } = useSession();

	return (
		<Container height='auto' minH='100vh'>
			<Header
				authSession={authSession}
				authenticatedUser={authenticatedUser}
			/>
			<chakra.main
				w='full'
				h='auto'
				d='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='flex-start'
				flex='1 0 auto'
				py={16}
			>
				<Flex
					w='full'
					maxW='container.lg'
					alignItems='center'
					justifyContent='start'
					mb={16}
				>
					<Heading as='h1' fontSize='5xl'>
						I want to write...
					</Heading>
				</Flex>
				<Grid
					w='full'
					maxW='container.lg'
					h='auto'
					templateColumns='repeat(3, 1fr)'
					gap={8}
					mb={16}
				>
					{writingPaths.map((path) => (
						<GridItem key={path.id}>
							<Button
								w='full'
								h={64}
								d='flex'
								flexDir='column'
								alignItems='center'
								justifyContent='center'
								bg='transparent'
								borderWidth={1}
								borderStyle='solid'
								borderColor='brand.200'
								borderRadius='2xl'
								cursor='pointer'
								onClick={onOpen}
								transition='all'
								transitionDuration='0.3s'
								transitionTimingFunction='ease-in-out'
								_hover={{
									boxShadow: 'xl',
								}}
							>
								<Image
									width={96}
									height={96}
									src={`/images/${path.id}.png`}
									alt={path.label}
								/>
								<Text fontSize='xl' mt={4}>
									{path.label}
								</Text>
							</Button>
						</GridItem>
					))}
				</Grid>
				<Modal isCentered={true} isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Modal Title</ModalHeader>
						<ModalCloseButton />
						<ModalBody></ModalBody>

						<ModalFooter>
							<Button variant='ghost' onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme='brand' ml={3}>
								Start
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</chakra.main>
		</Container>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			props: {},
		};
	}

	return {
		props: {
			user: { ...session.user, id: session.userId },
		},
	};
}
