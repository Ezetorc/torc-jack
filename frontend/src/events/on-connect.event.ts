import type { ConnectResponse } from '../../../shared/responses/connect.response'
import { Player } from '../../../shared/models/player.model'
import type { EventContext } from '../models/event-context.model'

export function onConnect(response: ConnectResponse, context: EventContext) {
	const newUser = new Player({ id: response.user.id, name: response.user.name })
	const newPlayers = [...(context.players ?? []), newUser]

	context.setPlayers(newPlayers)
	context.setUserId(newUser.id)
}
