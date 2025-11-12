import type { EventContext } from '../models/event-context.model.ts'
import { ResponseService } from '../services/response.service.ts'

export function onDisconnect(context: EventContext) {
	console.log(`🔴 ${context.connection.user.name} disconnected`)

	context.game.players.remove(context.connection.webSocket)
	ResponseService.update(context)
}
