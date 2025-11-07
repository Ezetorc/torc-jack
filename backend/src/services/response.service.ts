import { GameContext } from "../models/game-context.model.ts";
import type { UpdateResponse } from "../../../shared/responses/update.response.ts"

export class ResponseService {
  static update(context: GameContext) {
    const players = Array.from(context.players.values())
    const payload = JSON.stringify({ type: 'update', players, pot: context.pot } as UpdateResponse)

    for (const sock of context.players.keys()) {
      sock.send(payload)
    }
  }
}