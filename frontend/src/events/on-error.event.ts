import type { EventContext } from '../models/event-context.model'

export function onError(event: ErrorEvent, _context: EventContext) {
	console.error(event.message)
}
