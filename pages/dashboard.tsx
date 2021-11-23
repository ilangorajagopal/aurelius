import { useEffect, useState } from 'react';
import { chakra, Flex, Heading } from '@chakra-ui/react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import Posts from '../components/dashboard/Posts';
import Stats from '../components/dashboard/Stats';
import { getSession, useSession } from 'next-auth/react';
import prisma from '../lib/prisma';

export default function Dashboard(props) {
	const { posts } = props;
	const { data: authSession } = useSession();
	const [profile, setProfile] = useState(null);

	function getGreeting() {
		const now = new Date();
		const hrs = now.getHours();

		if (hrs > 0 && hrs < 6) return "Mornin' Sunshine!"; // REALLY early
		if (hrs >= 6 && hrs < 12)
			return profile?.name
				? `Good morning, ${profile?.name}!`
				: 'Good morning!'; // After 6am
		if (hrs >= 12 && hrs < 17)
			return profile?.name
				? `Good afternoon, ${profile?.name}!`
				: 'Good afternoon!'; // After 12pm
		if (hrs >= 17 && hrs < 22)
			return profile?.name
				? `Good evening, ${profile?.name}!`
				: 'Good evening!'; // After 5pm
		if (hrs >= 22) return 'Go to bed!'; // After 10pm
	}

	return (
		<Container height='auto' minH='100vh'>
			<Header authSession={authSession} />
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
				<Flex
					w='full'
					maxW='container.lg'
					alignItems='center'
					justifyContent='start'
					mb={16}
				>
					<Heading
						as='h1'
						fontSize='5xl'
					>{`${getGreeting()}`}</Heading>
				</Flex>
				<Flex
					d='none'
					w='full'
					maxW='container.lg'
					h='auto'
					alignItems='center'
					justifyContent='start'
					mb={16}
				>
					<Stats />
				</Flex>
				<Posts posts={posts} />
			</chakra.main>
			<Footer />
		</Container>
	);
}

export async function getServerSideProps({ req }) {
	const session = await getSession({ req });

	if (!session) {
		return { props: {}, redirect: { destination: '/', permanent: false } };
	}

	const posts = await prisma.post.findMany({
		where: {
			author_id: session?.user?.id,
		},
	});

	if (posts && posts.length > 0) {
		return {
			props: {
				posts: JSON.parse(JSON.stringify(posts)),
			},
		};
	} else {
		return {
			props: {
				posts: [],
			},
		};
	}
}
