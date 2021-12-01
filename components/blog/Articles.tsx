import {
	Flex,
	Grid,
	Heading,
	Link,
	Text,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import { convert } from 'html-to-text';
import { format } from 'date-fns';
import truncate from 'lodash.truncate';

const Articles = (props) => {
	const { articles } = props;

	return (
		<VStack
			w='full'
			maxW='container.lg'
			py={12}
			spacing={8}
			d='flex'
			alignItems='start'
		>
			<Heading
				as='h1'
				fontSize='5xl'
				fontWeight='bold'
				color={useColorModeValue('gray.900', 'gray.100')}
				mb={8}
			>
				Latest Posts
			</Heading>

			<Grid w='full' templateColumns='repeat(2, 1fr)' gap={8}>
				{articles.map((article, index) => {
					const content = convert(article.content);

					return (
						<Flex
							alignItems='start'
							justifyContent='center'
							flexDirection='column'
							textAlign='left'
							h={48}
							p={0}
							border={1}
							borderStyle='solid'
							borderColor='gray.100'
							rounded='lg'
							key={article.id}
							_hover={{
								borderColor: 'gray.200',
								textDecoration: 'none',
							}}
						>
							<Link
								w='full'
								h='full'
								href={`/blog/${article.slug}`}
								color={useColorModeValue(
									'gray.900',
									'gray.100'
								)}
								_hover={{ textDecoration: 'none' }}
								p={6}
							>
								<Text color='gray.400' fontSize='md' mb={2}>
									{format(new Date(article.createdAt), 'PP')}
								</Text>
								<Heading
									as='h3'
									fontSize='2xl'
									fontWeight='semibold'
									mb={4}
								>
									{article.title}
								</Heading>
								<Text color='gray.400' fontSize='lg' mb={2}>
									{truncate(content, { length: 140 })}
								</Text>
							</Link>
						</Flex>
					);
				})}
			</Grid>
		</VStack>
	);
};

export default Articles;
