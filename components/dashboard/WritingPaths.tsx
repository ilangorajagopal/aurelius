import NextLink from 'next/link';
import { Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';

export default function WritingPaths() {
	return (
		<VStack w='full' d='flex' alignItems='start' spacing={4}>
			<Flex w='full' alignItems='center' justifyContent='space-between'>
				<Heading as='h2'>My Writing Paths</Heading>
				<NextLink href='/dashboard/paths/new'>
					<Button
						aria-label='Start Writing'
						colorScheme='brand'
						size='lg'
						px={4}
					>
						<Text fontSize='lg'>Add Writing Path</Text>
					</Button>
				</NextLink>
			</Flex>
		</VStack>
	);
}
