import { Route, type RouteProps, type Params, useLocation } from 'wouter'
import { useUserStore } from '../stores/user.store'

export function ProtectedRoute<P extends Params>({
	component: Component,
	fallback,
	...rest
}: RouteProps<P> & { fallback?: string }) {
	const [, setLocation] = useLocation()
	const { connected } = useUserStore()

	if (!connected) {
		setLocation(fallback || '/')
		return null
	}

	return <Route<P> {...rest} component={Component} />
}
