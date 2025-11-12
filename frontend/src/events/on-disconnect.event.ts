import type { EventContext } from '../models/event-context.model'

export function onDisconnect(_event: CloseEvent, context: EventContext) {
	context.setPlayers(undefined)
	context.setUserId(undefined)
	context.setConnected(false)
}
