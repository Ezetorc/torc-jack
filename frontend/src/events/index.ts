import type { EventContext } from '../models/event-context.model'
import { onConnect } from './on-connect.event'
import { onDisconnect } from './on-disconnect.event'
import { onError } from './on-error.event'
import { onStart } from './on-start.event'
import { onUpdate } from './on-update.event'

export const eventHandlers: {
	[key: string]: (response: any, context: EventContext) => void
} = {
	connect: onConnect,
	disconnect: onDisconnect,
	error: onError,
	update: onUpdate,
	start: onStart
}
