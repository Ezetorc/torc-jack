import type { Player } from '../../../shared/models/player.model.ts'
import type { PlayerList } from './player-list.model.ts'

export type EventContext = {
  game: {
    players: PlayerList
    started: boolean
    turn: number
  }
  connection: {
    webSocket: WebSocket
    user: Player
  }
}
