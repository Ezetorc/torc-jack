import { lazy, Suspense } from 'react'
import { Switch, Route } from 'wouter'
import { Loading } from './components/Loading'
import { ProtectedRoute } from './components/ProtectedRoute'

const LazyMainPage = lazy(() => import('./pages/Main/components/main.page'))
const LazyRoomPage = lazy(() => import('./pages/Room/components/room.page'))
const LazyGamePage = lazy(() => import('./pages/Game/components/game.page'))

export default function App() {
	return (
		<Suspense fallback={<Loading />}>
			<main className='h-screen'>
				<Switch>
					<Route path='/' component={LazyMainPage} />
					<ProtectedRoute fallback='/' path='/room' component={LazyRoomPage} />
					<ProtectedRoute fallback='/' path='/play' component={LazyGamePage} />
				</Switch>
			</main>
		</Suspense>
	)
}
