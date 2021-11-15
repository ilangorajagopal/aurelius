import { useEffect, useState } from 'react';
import { chakra } from '@chakra-ui/react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
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
				Dashboard
			</chakra.main>
			<Footer />
		</Container>
	);
}
