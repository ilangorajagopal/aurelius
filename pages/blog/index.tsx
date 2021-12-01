import { chakra } from '@chakra-ui/react';
import Container from '../../components/Container';
import Header from '../../components/shared-post/Header';
import Footer from '../../components/shared-post/Footer';
import prisma from '../../prisma';
import Articles from '../../components/blog/Articles';

export default function Blog(props) {
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
				<Articles articles={posts} user={user} />
			</chakra.main>
			<Footer />
		</Container>
	);
}

export async function getStaticProps() {
	const user = await prisma.user.findUnique({
		where: {
			username: 'aurelius',
		},
		select: {
			id: true,
			name: true,
		},
	});

	const posts = await prisma.post.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return {
		props: {
			posts: JSON.parse(JSON.stringify(posts)),
			user,
		},
	};
}
