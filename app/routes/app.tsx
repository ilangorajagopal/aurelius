import { Outlet } from '@remix-run/react'
import Header from '~/routes/header'

export default function App() {
	return (
		<main className='flex h-full w-full flex-col items-center justify-start'>
			<Header />
			<Outlet />
		</main>
	)
}
