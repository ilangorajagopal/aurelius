import Head from 'next/head';
import Script from 'next/script';
import { AppProps } from 'next/app';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import theme from '../theme';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Script
				strategy='afterInteractive'
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
			/>
			<Script
				id='google-analytics'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						
						gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
							page_path: window.location.pathname,
						});
					`,
				}}
			/>
			<ChakraProvider resetCSS theme={theme}>
				<ColorModeProvider
					options={{
						useSystemColorMode: true,
					}}
				>
					<Head>
						<title>Aurelius</title>
					</Head>
					<Component {...pageProps} />
				</ColorModeProvider>
			</ChakraProvider>
		</>
	);
}

export default MyApp;
