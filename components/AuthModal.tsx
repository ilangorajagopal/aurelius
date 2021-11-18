import {
	Flex,
	Grid,
	Heading,
	List,
	ListIcon,
	ListItem,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Text,
	VStack,
	useColorModeValue,
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';
import NextImage from 'next/image';
import AuthBasic from './Auth';

export default function AuthModal(props) {
	return (
		<Modal
			isCentered={true}
			isOpen={props.isAuthModalOpen}
			onClose={props.onAuthModalClose}
			size='5xl'
		>
			<ModalOverlay />
			<ModalContent>
				<ModalBody py={12}>
					<Grid gap={4} templateColumns='repeat(2, 1fr)'>
						<VStack
							h='full'
							alignItems='start'
							justifyContent='center'
							color={useColorModeValue('black', 'white')}
							px={8}
							spacing={8}
						>
							<Heading as='h2' fontSize='2xl'>
								By signing up, you can:
							</Heading>
							<List spacing={4}>
								<ListItem d='flex' alignItems='start'>
									<ListIcon
										as={MdCheckCircle}
										color='green.500'
										fontSize='xl'
										mt={1}
									/>
									<VStack alignItems='start'>
										<Heading as='h3' fontSize='xl'>
											Sync to the cloud
										</Heading>
										<Text fontSize='sm'>
											Save all your writing to the cloud
											and access them anywhere
										</Text>
									</VStack>
								</ListItem>
								<ListItem d='flex' alignItems='start'>
									<ListIcon
										as={MdCheckCircle}
										color='green.500'
										fontSize='xl'
										mt={1}
									/>
									<VStack alignItems='start'>
										<Heading as='h3' fontSize='xl'>
											Track your writing goals
										</Heading>
										<Text fontSize='sm'>
											Get detailed analytics from your
											writing sessions and stay consistent
										</Text>
									</VStack>
								</ListItem>
								<ListItem d='flex' alignItems='start'>
									<ListIcon
										as={MdCheckCircle}
										color='green.500'
										fontSize='xl'
										mt={1}
									/>
									<VStack alignItems='start'>
										<Heading as='h3' fontSize='xl'>
											Shareable Links
										</Heading>
										<Text fontSize='sm'>
											Get shareable links to your posts
											and get feedback from your peers.
										</Text>
									</VStack>
								</ListItem>
								<ListItem d='flex' alignItems='start'>
									<ListIcon
										as={MdCheckCircle}
										color='green.500'
										fontSize='xl'
										mt={1}
									/>
									<VStack alignItems='start'>
										<Heading as='h3' fontSize='xl'>
											And more...
										</Heading>
										<Text fontSize='sm'>
											I&apos;m constantly adding features
											that help you become a better
											writer.
										</Text>
									</VStack>
								</ListItem>
							</List>
						</VStack>
						<VStack px={8} spacing={8}>
							<Flex
								w='full'
								alignItems='center'
								justifyContent='center'
							>
								<NextImage
									src='/images/shield.png'
									width={96}
									height={96}
								/>
							</Flex>
							<AuthBasic />
						</VStack>
					</Grid>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
