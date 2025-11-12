import type { Player } from "../models/player.model"

export type ConnectResponse = {
  type: 'connect'
  user: {
    id: Player["id"]
    name: Player["name"]
  }
}