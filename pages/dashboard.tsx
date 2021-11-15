import { useEffect, useState } from 'react';
import { chakra } from '@chakra-ui/react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import Posts from '../components/dashboard/Posts';

export default function Dashboard(props) {
	const { posts } = props;
	const [authSession, setAuthSession] = useState(null);

	useEffect(() => {
		setAuthSession(supabase.auth.user());

		supabase.auth.onAuthStateChange((event, session) => {
			setAuthSession(session);
		});
	}, [authSession]);

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
				<Posts posts={posts} />
			</chakra.main>
			<Footer />
		</Container>
	);
}

export async function getServerSideProps({ req }) {
	const { user } = await supabase.auth.api.getUserByCookie(req);

	if (!user) {
		return { props: {} };
	}

	// @ts-ignore
	supabase.auth.session = () => ({
		access_token: req.cookies['sb:token'],
	});

	const { data, error } = await supabase.from('posts').select();

	if (data && data.length > 0) {
		return {
			props: {
				posts: data,
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
