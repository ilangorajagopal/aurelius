import { chakra, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { supabase } from '../../lib/supabase';
import Container from '../../components/Container';
import Header from '../../components/shared-post/Header';
import Footer from '../../components/shared-post/Footer';

export default function SharedPost(props) {
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
					maxW='container.md'
					alignItems='start'
					spacing={8}
				>
					<VStack alignItems='start' spacing={1}>
						<Heading as='h1' fontSize='5xl'>
							{props?.post?.title}
						</Heading>
						<Text fontSize='lg'>{`by ${props?.user?.name}`}</Text>
					</VStack>
					<Flex
						className='aurelius-shared-post'
						flexDirection='column'
						dangerouslySetInnerHTML={{
							__html: props?.post?.content,
						}}
					/>
				</VStack>
			</chakra.main>
			<Footer />
		</Container>
	);
}

export async function getServerSideProps(context) {
	const {
		params: { username, share_id },
	} = context;

	const { data: user, error } = await supabase
		.from('profiles')
		.select('name,user_id')
		.match({ username })
		.single();

	const { data: post, postError } = await supabase
		.from('posts')
		.select('title,content')
		.match({ share_id })
		.single();

	return {
		props: { user, post },
	};
}
