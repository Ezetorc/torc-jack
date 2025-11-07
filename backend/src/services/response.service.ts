import { GameContext } from "../models/game-context.model.ts";
import type { UpdateResponse } from "../../../shared/responses/update.response.ts"

export class ResponseService {
  static update(context: GameContext) {
    const players = Array.from(context.players.values())
    const response: UpdateResponse = { type: 'update', players }
    const payload = JSON.stringify(response)

    for (const sock of context.players.keys()) {
      sock.send(payload)
    }
  }
}