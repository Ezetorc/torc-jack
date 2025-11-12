import { create } from 'zustand'
import type { UserStore } from '../models/user-store.model'

export const useUserStore = create<UserStore>((set) => ({
	userId: undefined,
	setUserId: (userId?: string) => set({ userId }),
	connected: false,
	setConnected: (connected: boolean) => set({ connected })
}))
