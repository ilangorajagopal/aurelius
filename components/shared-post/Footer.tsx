import {
	Button,
	Flex,
	Grid,
	HStack,
	Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import { Info } from 'react-feather';
import About from '../About';

export default function Footer() {
	const { isOpen, onOpen, onClose } = useDisclosure();

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
					align='center'
					justifyContent='start'
					fontSize='xl'
					fontWeight='bold'
					color={useColorModeValue('gray.900', 'white')}
				/>

				<HStack h='full' align='center' justify='end'>
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
									<ModalCloseButton />
									<ModalBody py={6}>
										<About />
									</ModalBody>
								</ModalContent>
							</Modal>
						</>
					</Flex>
				</HStack>
			</Grid>
		</Flex>
	);
}
