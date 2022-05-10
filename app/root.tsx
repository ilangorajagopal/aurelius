import React from 'react'
import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
import styles from './tailwind.css'

interface DocumentProps {
	children: React.ReactNode
}

export const links: LinksFunction = () => {
	return [
		{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
		{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap',
		},
		{ rel: 'stylesheet', href: styles },
		{ rel: 'manifest', href: '/site.webmanifest' },
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			href: '/apple-touch-icon.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			href: '/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			href: '/favicon-16x16.png',
		},
		{ rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
	]
}

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	'msapplication-TileColor': '#2b5797',
	'og:site': 'https://aurelius.ink',
	'og:url': 'https://aurelius.ink',
	'og:title': 'Aurelius',
	'og:description':
		'Beautiful, minimal writing app. Eliminate distractions when writing, build a writing habit, track your daily writing goal, and more.',
	'og:image': '/images/aurelius_open_graph.png',
	'theme-color': '#ffffff',
	title: 'Aurelius',
	'twitter:card': 'summary_large_image',
	'twitter:site': '@_ilango',
	'twitter:url': 'https://aurelius.ink/',
	'twitter:creator': '@_ilango',
	'twitter:title': 'Aurelius',
	'twitter:description':
		'Beautiful, minimal writing app. Eliminate distractions when writing, build a writing habit, track your daily writing goal, and more.',
	'twitter:image': 'https://www.aurelius.ink/images/aurelius_open_graph.png',
	viewport: 'width=device-width,initial-scale=1',
})

const Document = (props: DocumentProps) => {
	return (
		<html lang='en' className='h-full'>
			<head>
				<Meta />
				<Links />
			</head>
			<body className='h-full w-full bg-brand-900'>
				{props.children}
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
			</body>
		</html>
	)
}

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	)
}
