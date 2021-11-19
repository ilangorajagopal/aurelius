import {
	Flex,
	Link,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import NextImage from 'next/image';

export default function About(props) {
	return (
		<Modal
			isCentered={true}
			isOpen={props.isAboutModalOpen}
			onClose={props.onAboutModalClose}
			size='xl'
		>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalBody py={6}>
					<VStack
						align='center'
						justify='center'
						color={useColorModeValue('gray.900', 'white')}
						textAlign='center'
						spacing={4}
					>
						<Flex
							w='full'
							alignItems='center'
							justifyContent='center'
						>
							<NextImage
								src='/images/about.png'
								width={128}
								height={128}
							/>
						</Flex>

						<Text fontSize='lg' fontWeight='semibold'>
							About Aurelius
						</Text>

						<Text textAlign='left'>
							Aurelius was born out of a requirement for a writing
							app that suited my needs. After trying many writing
							apps — code editors to note taking app — none of
							them help with maintaining a writing habit. Some of
							them have a poor writing experience by doing too
							much stuff.
						</Text>

						<Text textAlign='left'>
							I wanted a simple writing app that has the features
							for building a writing habit while having an
							enjoyable writing experience. While the current
							state only supports single posts suited for
							articles, I want to support more use-cases like book
							writing, daily journals, and more.
						</Text>

						<Text textAlign='left'>
							Aurelius is heavily inspired by{' '}
							<Link
								color='brand.200'
								href='https://blurt.app'
								isExternal={true}
							>
								Blurt
							</Link>
							. It had everything I needed but unfortunately it
							got acquired and is no longer accessible to the
							public. I want to avoid that for Aurelius. Aurelius
							will never be acquired. To make that possible,
							I&apos;ll eventually start charging a subscription
							fee for usage.
						</Text>

						<Text textAlign='left'>
							But there are a lot of things that are out of my
							control that might affect my running of Aurelius.
							So, to prevent any disruption to users, I&apos;m
							making the entire source-code available to the
							public on Github. With a little technical know-how,
							you can host Aurelius anywhere you like.
						</Text>

						<Text textAlign='left'>
							If you think this is something you&apos;d be
							interested in, follow me on{' '}
							<Link
								color='brand.200'
								href='https://twitter.com/_ilango'
								isExternal={true}
							>
								Twitter
							</Link>
							. Feel free to drop a DM and ask me anything about
							Aurelius.
						</Text>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
