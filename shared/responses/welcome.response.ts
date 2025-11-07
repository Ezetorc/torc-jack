import type { Player } from "../models/player.model"

export type WelcomeResponse = {
  type: 'welcome'
  user: {
    id: Player["id"]
    name: Player["name"]
  }
}