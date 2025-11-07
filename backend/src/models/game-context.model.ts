import { Player } from "../../../shared/models/player.model.ts";

export type GameContext = {
  ws: WebSocket
  user: Player
  players: Map<WebSocket, Player>
}