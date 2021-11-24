import { useEffect, useState } from 'react';
import { chakra, Flex, Heading } from '@chakra-ui/react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Posts from '../components/dashboard/Posts';
import Stats from '../components/dashboard/Stats';
import { getSession, useSession } from 'next-auth/react';
import { fetchUserProfile } from '../lib/utils';
import { usePosts } from '../lib/hooks';

export default function Dashboard(props) {
	const { user: authenticatedUser } = props;
	const { data: authSession } = useSession();
	const { posts, isLoading, isError } = usePosts(authSession?.userId);
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		async function fetchProfile() {
			const { user } = await fetchUserProfile(authenticatedUser?.id);
			setProfile(user);
		}

		fetchProfile().then(() => console.log('Profile fetched...'));
	}, [authSession]);

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
			<Header authSession={authSession} user={authenticatedUser} />
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
				<Posts posts={posts} session={authSession} />
			</chakra.main>
			<Footer />
		</Container>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			props: {},
		};
	}

	return {
		props: {
			user: { ...session.user, id: session.userId },
		},
	};
}
