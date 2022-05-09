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
					alignItems='center'
					justifyContent='start'
					fontSize='xl'
					fontWeight='bold'
					color={useColorModeValue('gray.900', 'white')}
				/>

				<HStack h='full' alignItems='center' justifyContent='end'>
					{/* About */}
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
				</HStack>
			</Grid>
		</Flex>
	);
}
