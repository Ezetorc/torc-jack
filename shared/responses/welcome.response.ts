import type { Player } from "../models/player.model"

export type WelcomeResponse = {
  type: 'welcome'
  id: Player["id"]
  name: Player["name"]
}