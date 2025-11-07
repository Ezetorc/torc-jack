import { create } from 'zustand'
import type { PlayerList } from '../models/player-list.model'
import type { GameStore } from '../models/game-store.model'
import type { SocketService } from '../services/socket.service'

export const useGameStore = create<GameStore>((set) => ({
  players: undefined,
  setPlayers: (players: PlayerList) => set({ players }),
  pot: 0,
  setPot: (pot: number) => set({ pot }),
  socket: undefined,
  setSocket: (socket: SocketService) => set({ socket })
}))