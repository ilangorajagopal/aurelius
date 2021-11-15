import {
	Grid,
	GridItem,
	Heading,
	HStack,
	IconButton,
	Text,
	VStack,
} from '@chakra-ui/react';
import { format, formatDistance } from 'date-fns';
import { Edit2, Trash2 } from 'react-feather';

export default function Posts(props) {
	const { posts } = props;

	return (
		<VStack w='full' maxW='container.lg' align='start' spacing={8}>
			<Heading as='h1'>Posts</Heading>
			<VStack w='full' spacing={8}>
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
											w={12}
											h={12}
											d='flex'
											alignItems='center'
											justifyContent='center'
											icon={
												<Edit2 width={16} height={16} />
											}
										/>
										<IconButton
											w={12}
											h={12}
											d='flex'
											alignItems='center'
											justifyContent='center'
											icon={
												<Trash2
													width={16}
													height={16}
												/>
											}
										/>
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
