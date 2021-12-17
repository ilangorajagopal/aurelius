import { chakra } from '@chakra-ui/react';
import Container from '../components/Container';
import Header from '../components/pages/Header';
import Footer from '../components/pages/Footer';

export default function Home() {
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
				Main
			</chakra.main>
			<Footer />
		</Container>
	);
}
