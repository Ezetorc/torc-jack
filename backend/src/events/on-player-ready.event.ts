import type { EventContext } from '../models/event-context.model.ts'
import { ResponseService } from '../services/response.service.ts'
import { onStart } from './on-start.event.ts'

export function onPlayerReady(context: EventContext) {
	console.log(`[onPlayerReady] ${context.connection.user.name} is ready`)
	context.connection.user.isReady = true

	if (context.game.players.areAllReady && context.game.players.size > 1) {
		onStart(context)
	} else {
		ResponseService.update(context)
	}
}
