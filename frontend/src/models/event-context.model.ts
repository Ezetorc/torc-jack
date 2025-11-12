import type { GameStore } from './game-store.model'
import type { UserStore } from './user-store.model'

export type EventContext = {
  setPlayers: GameStore['setPlayers']
  players: GameStore['players']
  setUserId: UserStore['setUserId']
  userId: UserStore['userId']
  setConnected: UserStore['setConnected']
  setLocation: (location: string) => void
  setTurn: GameStore['setTurn']
}
