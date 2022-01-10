import { Fragment } from 'react';
import NextLink from 'next/link';
import {
	Button,
	ButtonGroup,
	chakra,
	Divider,
	Flex,
	Grid,
	GridItem,
	Heading,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverFooter,
	PopoverHeader,
	PopoverTrigger,
	Portal,
	Tag,
	Text,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import { format, formatDistance } from 'date-fns';
import copy from 'copy-to-clipboard';
import truncate from 'lodash.truncate';
import { Check, Clipboard, Edit2, Edit3, Share2, Trash2 } from 'react-feather';
import Container from '../../components/Container';
import Header from '../../components/shared-post/Header';
import Footer from '../../components/shared-post/Footer';
import prisma from '../../prisma';

export default function Profile(props) {
	const { posts, user } = props;

	return (
		<Container height='auto' minH='100vh'>
			<Header />
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
				<VStack
					w='full'
					maxW='container.lg'
					alignItems='start'
					spacing={8}
				>
					<Heading as='h1' fontSize='4xl' mb={8}>
						{props.user.name}
					</Heading>
					<VStack w='full' h='auto' py={8} spacing={4}>
						<Flex
							w='full'
							alignItems='center'
							justifyContent='space-between'
							mb={4}
						>
							<Heading as='h2' fontSize='2xl'>
								Latest Posts
							</Heading>
						</Flex>
						{posts && posts.length > 0 ? (
							posts.map((post, index) => {
								const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}/@${user?.username}/${post.shareId}`;

								return (
									<Fragment key={post.id}>
										<VStack
											w='full'
											h='full'
											alignItems='start'
											justifyContent='center'
											spacing={1}
										>
											<Text
												fontSize='2xl'
												fontWeight='bold'
												mb={2}
												title={post.title}
											>
												{truncate(post.title, {
													length: 48,
												})}
											</Text>
											<HStack spacing={2}>
												<Text
													fontSize='xs'
													title={format(
														new Date(
															post.createdAt
														),
														'PPPpp'
													)}
												>
													{formatDistance(
														new Date(
															post.createdAt
														),
														new Date(),
														{ addSuffix: true }
													)}
												</Text>
											</HStack>
										</VStack>
										{index < posts.length - 1 ? (
											<Divider mb={4} />
										) : null}
									</Fragment>
								);
							})
						) : (
							<Flex
								w='full'
								h={48}
								alignItems='center'
								justifyContent='center'
								flexDirection='column'
								bg={useColorModeValue('gray.100', 'gray.800')}
								p={8}
								overflow='hidden'
								rounded='md'
							>
								<Text fontSize='xl' fontWeight='bold' mb={2}>
									No Published Posts
								</Text>
								<Text>
									{`${user.name} hasn't published any posts yet.`}
								</Text>
							</Flex>
						)}
					</VStack>
				</VStack>
			</chakra.main>
			<Footer />
		</Container>
	);
}

export async function getServerSideProps(context) {
	const {
		params: { username },
	} = context;

	const user = await prisma.user.findUnique({
		where: {
			username: username.replace('@', ''),
		},
		select: {
			id: true,
			name: true,
		},
	});

	const posts = await prisma.post.findMany({
		where: { published: true, userId: user.id },
	});

	return {
		props: {
			posts: JSON.parse(JSON.stringify(posts)),
			user,
		},
	};
}
