import type { Player } from '../../../shared/models/player.model'
import type { SocketService } from '../services/socket.service'

export type GameStore = {
  players?: Player[]
  setPlayers: (players?: Player[]) => void
  socket?: SocketService
  setSocket: (socket?: SocketService) => void
  turn?: number
  setTurn: (turn?: number) => void
}
