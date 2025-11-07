import type { SocketService } from "../services/socket.service"
import type { PlayerList } from "./player-list.model"

export type GameStore = {
  players?: PlayerList,
  setPlayers: (players: PlayerList) => void,
  pot: number,
  setPot: (pot: number) => void,
  socket?: SocketService,
  setSocket: (socket: SocketService) => void
}