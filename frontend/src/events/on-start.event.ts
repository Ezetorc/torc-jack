import type { StartResponse } from '../../../shared/responses/start.response'
import type { EventContext } from '../models/event-context.model'

export function onStart(_response: StartResponse, context: EventContext) {
	context.setLocation('/play')
}
