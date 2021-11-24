import { Fragment, useState } from 'react';
import NextLink from 'next/link';
import {
	Button,
	ButtonGroup,
	Divider,
	Flex,
	Grid,
	GridItem,
	Heading,
	HStack,
	IconButton,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	Portal,
	Text,
	VStack,
	useToast,
	useColorModeValue,
} from '@chakra-ui/react';
import { format, formatDistance } from 'date-fns';
import { Edit2, Edit3, Share2, Trash2 } from 'react-feather';
import { mutate } from 'swr';

export default function Posts(props) {
	const { posts, session } = props;
	const [isDeleting, setIsDeleting] = useState(false);
	const toast = useToast();

	// function editPost(id) {
	//
	// }

	async function deletePost(id) {
		setIsDeleting(true);
		await fetch(`/api/posts/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		await mutate(`/api/posts?userId=${session?.user?.id}`);
		toast({
			duration: 2000,
			position: 'top',
			status: 'success',
			title: 'Post deleted',
		});
		setIsDeleting(false);
	}

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
			<VStack w='full' h='auto' overflowX='hidden' spacing={4}>
				{posts && posts.length > 0 ? (
					posts.map((post, index) => {
						return (
							<Fragment key={post.id}>
								<Grid
									w='full'
									h={24}
									px={0}
									py={4}
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
											<Text
												fontSize='2xl'
												fontWeight='bold'
											>
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
											<IconButton
												aria-label='share post'
												icon={
													<Edit2
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
											<Popover>
												{({ isOpen, onClose }) => (
													<>
														<PopoverTrigger>
															<IconButton
																aria-label='delete post'
																icon={
																	<Trash2
																		width={
																			16
																		}
																		height={
																			16
																		}
																	/>
																}
																w={10}
																h={10}
																d='flex'
																alignItems='center'
																justifyContent='center'
																variant='ghost'
															/>
														</PopoverTrigger>
														<Portal>
															<PopoverContent>
																<PopoverArrow />
																<PopoverBody
																	p={4}
																>
																	<Text
																		fontSize='lg'
																		color={useColorModeValue(
																			'black',
																			'white'
																		)}
																	>
																		Are you
																		sure?
																	</Text>
																</PopoverBody>
																<PopoverFooter>
																	<ButtonGroup
																		d='flex'
																		justifyContent='flex-end'
																	>
																		<Button
																			onClick={
																				onClose
																			}
																			size='sm'
																			variant='ghost'
																		>
																			Cancel
																		</Button>
																		<Button
																			colorScheme='red'
																			isLoading={
																				isDeleting
																			}
																			onClick={() =>
																				deletePost(
																					post.id
																				)
																			}
																			size='sm'
																		>
																			Confirm
																		</Button>
																	</ButtonGroup>
																</PopoverFooter>
															</PopoverContent>
														</Portal>
													</>
												)}
											</Popover>
										</HStack>
									</GridItem>
								</Grid>
								{index < posts.length - 1 ? (
									<Divider mb={4} />
								) : null}
							</Fragment>
						);
					})
				) : (
					<VStack>Start Writing</VStack>
				)}
			</VStack>
		</VStack>
	);
}
