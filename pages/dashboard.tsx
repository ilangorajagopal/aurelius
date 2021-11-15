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
