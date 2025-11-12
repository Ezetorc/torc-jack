import { create } from 'zustand'
import type { GameStore } from '../models/game-store.model'
import type { SocketService } from '../services/socket.service'
import type { Player } from '../../../shared/models/player.model'

export const useGameStore = create<GameStore>((set) => ({
  players: undefined,
  setPlayers: (players?: Player[]) => set({ players }),
  socket: undefined,
  setSocket: (socket?: SocketService) => set({ socket }),
  turn: undefined,
  setTurn: (turn?: number) => set({ turn })
}))
