import { create } from 'zustand'
import type { UserStore } from '../models/user-store.model'
import type { Player } from '../../../shared/models/player.model'

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user: Player) => set({ user }),
  connected: false,
  setConnected: (connected: boolean) => set({ connected })
}))