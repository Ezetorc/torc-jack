import { Card } from '../../../shared/models/card.model.ts'
import { ResponseService } from '../services/response.service.ts'
import type { Player } from '../../../shared/models/player.model.ts'
import type { EventContext } from '../models/event-context.model.ts'

export function onStart(context: EventContext) {
  console.log('[onStart] Game started')
  context.game.started = true

  for (const player of context.game.players.values) {
    const giveCard = (player: Player) => {
      const newCard = Card.getRandom()

      if (!context.game.players.isCardIn(newCard)) {
        player.cards.push(newCard)
      }
    }

    giveCard(player)

    while (!player.hasCompleteDeck) {
      giveCard(player)
    }
  }

  ResponseService.start(context)
  ResponseService.update(context)
}
