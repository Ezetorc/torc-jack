import type { Player } from "../../../shared/models/player.model"

export type UserStore = {
  user?: Player,
  setUser: (user: Player) => void,
  connected: boolean,
  setConnected: (connected: boolean) => void
}