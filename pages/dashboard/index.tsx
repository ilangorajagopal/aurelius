import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { chakra, Flex, Heading } from '@chakra-ui/react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Stats from '../../components/dashboard/Stats';
import WritingPaths from '../../components/dashboard/WritingPaths';
import Posts from '../../components/dashboard/Posts';
import Footer from '../../components/Footer';
import { getSession, useSession } from 'next-auth/react';
import { fetchUserProfile, getGreeting } from '../../lib/utils';
import { usePosts } from '../../lib/hooks';

export default function Dashboard(props) {
	const { user: authenticatedUser } = props;
	const router = useRouter();
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
					<Heading as='h1' fontSize='5xl'>{`${getGreeting(
						profile?.name
					)}`}</Heading>
				</Flex>
				<Flex
					w='full'
					maxW='container.lg'
					h='auto'
					alignItems='center'
					justifyContent='start'
					mb={16}
				>
					<Stats
						createdAt={profile?.createdAt}
						posts={posts}
						goal={profile?.dailyGoal}
					/>
				</Flex>
				{/*<Flex*/}
				{/*	w='full'*/}
				{/*	maxW='container.lg'*/}
				{/*	h='auto'*/}
				{/*	alignItems='center'*/}
				{/*	justifyContent='start'*/}
				{/*	mb={16}*/}
				{/*>*/}
				{/*	<WritingPaths />*/}
				{/*</Flex>*/}
				<Posts posts={posts} profile={profile} session={authSession} />
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
