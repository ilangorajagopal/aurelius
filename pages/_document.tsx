import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<link
						rel='preconnect'
						href='https://fonts.googleapis.com'
					/>
					<link
						rel='preconnect'
						href='https://fonts.gstatic.com'
						crossOrigin='true'
					/>
					<link
						href='https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap'
						rel='stylesheet'
					/>
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href='/apple-touch-icon.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='32x32'
						href='/favicon-32x32.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='16x16'
						href='/favicon-16x16.png'
					/>
					<link rel='manifest' href='/site.webmanifest' />
					<link
						rel='mask-icon'
						href='/safari-pinned-tab.svg'
						color='#5bbad5'
					/>
					<meta name='msapplication-TileColor' content='#2b5797' />
					<meta name='theme-color' content='#ffffff' />

					{/* Primary Meta Tags */}
					<meta name='title' content='Aurelius' />
					<meta
						name='description'
						content='Beautiful, minimal writing app. Eliminate distractions when writing, build a writing habit, track your daily writing goal, and more.'
					/>

					{/* Open Graph / Facebook */}
					<meta property='og:type' content='website' />
					<meta
						property='og:site'
						content='https://www.aurelius.ink'
					/>
					<meta
						property='og:url'
						content='https://www.aurelius.ink/'
					/>
					<meta property='og:title' content='Aurelius' />
					<meta
						property='og:description'
						content='Beautiful, minimal writing app. Eliminate distractions when writing, build a writing habit, track your daily writing goal, and more.'
					/>
					<meta
						property='og:image'
						content='/images/aurelius_open_graph.png'
					/>

					{/* Twitter */}
					<meta
						property='twitter:card'
						content='summary_large_image'
					/>
					{/*  to have large image post format in Twitter */}
					<meta property='twitter:site' content='@_ilango' />
					<meta
						property='twitter:url'
						content='https://www.aurelius.ink/'
					/>
					<meta property='twitter:creator' content='@_ilango' />
					<meta property='twitter:title' content='Aurelius' />
					<meta
						property='twitter:description'
						content='Beautiful, minimal writing app. Eliminate distractions when writing, build a writing habit, track your daily writing goal, and more.'
					/>
					<meta
						property='twitter:image'
						content='https://www.aurelius.ink/images/aurelius_open_graph.png'
					/>
				</Head>
				<body>
					{/* Make Color mode to persists when you refresh the page. */}
					<ColorModeScript />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
