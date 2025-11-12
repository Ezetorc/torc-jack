import type { EventContext } from '../models/event-context.model.ts'
import { ResponseService } from '../services/response.service.ts'

export function onStand(context: EventContext) {
  if (!context.game.players.isTurnOf(context.connection.user.id, context.game.turn)) return

  ResponseService.nextTurn(context)
}
