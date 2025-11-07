import type { Card } from "../../../shared/models/card.model"
import type { Player } from "../../../shared/models/player.model"

export class PlayerList {
  players: Player[]

  constructor(players: Player[]) {
    this.players = players
  }

  isCardIn(card: Card) {
    return this.players.some((player) => player.has(card))
  }

  getPlayer(index: number) {
    return this.players[index]
  }

  get areDecksComplete() {
    return this.players.every((player) => player.hasCompleteDeck)
  }

  get all() {
    return this.players
  }

  get length() {
    return this.players.length
  }

  get dealerIndex() {
    return this.players.findIndex((player) => player.isDealer)
  }
}
