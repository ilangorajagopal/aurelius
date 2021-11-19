import NextLink from 'next/link';
import {
	Button,
	Flex,
	Grid,
	GridItem,
	Heading,
	HStack,
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Text,
	VStack,
} from '@chakra-ui/react';
import { format, formatDistance } from 'date-fns';
import { Edit2, Edit3, MoreVertical, Share2, Trash2 } from 'react-feather';
// import {supabase} from "../../lib/supabase";

export default function Posts(props) {
	const { posts } = props;

	// function editPost(id) {
	//
	// }
	//
	// async function deletePost(id) {
	// 	const { data, error } = await supabase
	// 		.from('posts')
	// 		.delete()
	// 		.match({ id });
	// }

	return (
		<VStack
			w='full'
			maxW='container.lg'
			align='start'
			overflowX='hidden'
			spacing={8}
		>
			<Flex w='full' alignItems='center' justifyContent='space-between'>
				<Heading as='h2'>Posts</Heading>
				<NextLink href='/'>
					<Button colorScheme='brand' size='lg' px={4}>
						<Edit3 width={16} height={16} />
						<Text fontSize='lg' ml={2}>
							Write
						</Text>
					</Button>
				</NextLink>
			</Flex>
			<VStack w='full' overflowX='hidden' spacing={4}>
				{posts && posts.length > 0 ? (
					posts.map((post) => {
						return (
							<Grid
								key={post.id}
								w='full'
								h={28}
								px={6}
								py={4}
								borderWidth={1}
								borderStyle='solid'
								rounded='lg'
								templateColumns='repeat(3, 1fr)'
							>
								<GridItem h='full' colSpan={2}>
									<VStack
										w='full'
										h='full'
										alignItems='start'
										justifyContent='center'
										spacing={1}
									>
										<Text fontSize='2xl' fontWeight='bold'>
											{post.title}
										</Text>
										<Text
											fontSize='xs'
											title={format(
												new Date(post.created_at),
												'PPPpp'
											)}
										>
											{formatDistance(
												new Date(post.created_at),
												new Date(),
												{ addSuffix: true }
											)}
										</Text>
									</VStack>
								</GridItem>
								<GridItem h='full' colSpan={1}>
									<HStack
										w='full'
										h='full'
										alignItems='center'
										justifyContent='end'
										spacing={4}
									>
										<IconButton
											aria-label='share post'
											icon={
												<Share2
													width={16}
													height={16}
												/>
											}
											w={10}
											h={10}
											d='flex'
											alignItems='center'
											justifyContent='center'
											variant='ghost'
										/>
										<Menu>
											<MenuButton
												as={IconButton}
												aria-label='options'
												icon={<MoreVertical />}
												w={10}
												h={10}
												d='flex'
												alignItems='center'
												justifyContent='center'
												variant='ghost'
											/>
											<MenuList p={0}>
												<MenuItem
													h={12}
													icon={
														<Edit2
															width={16}
															height={16}
														/>
													}
												>
													Edit Post
												</MenuItem>
												<MenuItem
													h={12}
													icon={
														<Trash2
															width={16}
															height={16}
														/>
													}
												>
													Delete Post
												</MenuItem>
											</MenuList>
										</Menu>
									</HStack>
								</GridItem>
							</Grid>
						);
					})
				) : (
					<VStack>Start Writing</VStack>
				)}
			</VStack>
		</VStack>
	);
}
