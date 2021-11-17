import { useEffect, useState } from 'react';
import { chakra, Flex, Grid, Heading } from '@chakra-ui/react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import Posts from '../components/dashboard/Posts';
import Stats from '../components/dashboard/Stats';

export default function Dashboard(props) {
	const { posts } = props;
	const [authSession, setAuthSession] = useState(null);

	useEffect(() => {
		setAuthSession(supabase.auth.session());

		supabase.auth.onAuthStateChange((event, session) => {
			setAuthSession(session);
		});
	}, [authSession]);

	function getGreeting() {
		const now = new Date();
		const hrs = now.getHours();

		if (hrs > 0 && hrs < 6) return "Mornin' Sunshine!"; // REALLY early
		if (hrs > 6 && hrs < 12) return 'Good morning!'; // After 6am
		if (hrs > 12 && hrs < 17) return 'Good afternoon!'; // After 12pm
		if (hrs > 17 && hrs < 22) return 'Good evening!'; // After 5pm
		if (hrs > 22) return 'Go to bed!'; // After 10pm
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
				<Grid
					w='full'
					maxW='container.lg'
					templateColumns='repeat(2, 1fr)'
					mb={16}
				>
					<Flex alignItems='center' justifyContent='start'>
						<Heading
							as='h1'
							fontSize='5xl'
						>{`${getGreeting()}`}</Heading>
					</Flex>
				</Grid>
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
	const { user } = await supabase.auth.api.getUserByCookie(req);

	if (!user) {
		return { props: {}, redirect: { destination: '/', permanent: false } };
	}

	// @ts-ignore
	supabase.auth.session = () => ({
		access_token: req.cookies['sb:token'],
	});

	const { data: posts, error } = await supabase
		.from('posts')
		.select()
		.match({ user_id: user?.id })
		.order('created_at', { ascending: false });

	if (posts && posts.length > 0) {
		return {
			props: {
				posts,
			},
		};
	} else {
		return {
			props: {
				error,
			},
		};
	}
}
