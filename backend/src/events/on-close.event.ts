import { GameContext } from "../models/game-context.model.ts";
import { ResponseService } from "../services/response.service.ts";

export function onClose(context: GameContext) {
  console.log(`🔴 ${context.player.name} disconnected`)

  context.players.delete(context.ws)
  ResponseService.update(context)
}