import { Route, type RouteProps, type Params, useLocation } from "wouter";
import { useUser } from "../hooks/use-user.hook";

export function ProtectedRoute<P extends Params>({
  component: Component,
  fallback,
  ...rest
}: RouteProps<P> & { fallback?: string }) {
  const [, setLocation] = useLocation();
  const { connected } = useUser()

  if (!connected) {
    setLocation(fallback || "/");
    return null;
  }

  return <Route<P> {...rest} component={Component} />;
}