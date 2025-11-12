import type { Request } from '../../../shared/models/request.model.ts'
import type { ErrorResponse } from '../../../shared/responses/error.response.ts'
import { onHit } from './on-hit.event.ts'
import { onPlayerReady } from './on-player-ready.event.ts'
import { onStand } from './on-stand.event.ts'
import type { EventContext } from '../models/event-context.model.ts'

const actions: { [key in Request['type']]: (context: EventContext) => void } = {
	hit: onHit,
	stand: onStand,
	ready: onPlayerReady
}

export function onMessage(context: EventContext, event: MessageEvent) {
	try {
		const request = JSON.parse(event.data) as Request

		actions[request.type](context)
	} catch (error) {
		console.error(error)
		context.connection.webSocket.send(
			JSON.stringify({ type: 'error', message: error } as ErrorResponse)
		)
	}
}
