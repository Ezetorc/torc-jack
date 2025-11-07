import type { Player } from "../models/player.model"

export type UpdateResponse = {
  type: "update"
  players: Player[]
}