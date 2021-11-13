import {
	Button,
	Flex,
	Grid,
	HStack,
	Icon,
	Link,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	useColorModeValue,
} from '@chakra-ui/react';
import { Crosshair, Download, Edit3, Eye, Settings } from 'react-feather';

export default function Header(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex
			as='header'
			w='full'
			h={16}
			px={6}
			alignItems='center'
			justifyContent='space-between'
			overflowY='hidden'
			{...props}
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
						variant='ghost'
					>
						<Icon as={Crosshair} />
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
					<Button size='sm'>New Session</Button>

					<>
						<Button
							w={10}
							h={10}
							p={0}
							rounded='md'
							d='flex'
							align='center'
							justify='center'
							onClick={onOpen}
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
									<Button colorScheme='brand'>Save</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>
					</>

					<>
						<Button
							w={10}
							h={10}
							p={0}
							rounded='md'
							d='flex'
							align='center'
							justify='center'
							onClick={onOpen}
							variant='ghost'
						>
							<Icon as={Settings} />
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
									<Button colorScheme='brand'>Save</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>
					</>

					<Button colorScheme='brand' size='sm'>
						Sign In
					</Button>
				</HStack>
			</Grid>
		</Flex>
	);
}
