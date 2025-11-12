export type UserStore = {
	userId?: string
	setUserId: (userId?: string) => void
	connected: boolean
	setConnected: (connected: boolean) => void
}
