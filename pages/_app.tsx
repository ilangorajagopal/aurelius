import Head from 'next/head';
import { AppProps } from 'next/app';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import theme from '../theme';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<ColorModeProvider
				options={{
					useSystemColorMode: true,
				}}
			>
				<Head>
					<title>The Writing App</title>
				</Head>
				<Component {...pageProps} />
			</ColorModeProvider>
		</ChakraProvider>
	);
}

export default MyApp;
