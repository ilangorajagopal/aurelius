import { chakra } from '@chakra-ui/react';
import { Container } from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Main from '../components/content/Main';

export default function Index() {
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
				<Main />
			</chakra.main>
			<Footer />
		</Container>
	);
}
