import type { UpdateResponse } from '../../../shared/responses/update.response'
import type { EventContext } from '../models/event-context.model'
import { Player } from '../../../shared/models/player.model'

export function onUpdate(response: UpdateResponse, context: EventContext) {
  const newPlayers = response.players.map((player) => new Player(player))
  context.setPlayers(newPlayers)
  context.setTurn(response.turn)
}
