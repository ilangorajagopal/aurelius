import NextImage from 'next/image';
import { Flex, HStack, Text } from '@chakra-ui/react';

export default function Stats() {
	return (
		<HStack
			w='full'
			h='full'
			d='flex'
			alignItems='center'
			justifyContent='end'
			spacing={4}
		>
			<Flex
				w='auto'
				h={16}
				px={4}
				py={2}
				d='flex'
				alignItems='center'
				justifyContent='center'
				borderWidth={1}
				borderStyle='solid'
				rounded='lg'
			>
				<NextImage src='/images/fire.png' width={32} height={32} />
				<Text fontSize='xl' mx={2}>
					1
				</Text>
			</Flex>
			<Flex
				w='auto'
				h={16}
				px={4}
				py={2}
				d='flex'
				alignItems='center'
				justifyContent='center'
				borderWidth={1}
				borderStyle='solid'
				rounded='lg'
			>
				<NextImage src='/images/pencil.png' width={32} height={32} />
				<Text fontSize='xl' mx={2}>
					250
				</Text>
			</Flex>
		</HStack>
	);
}
