import type { Player } from '../../../shared/models/player.model.ts'
import type { Card } from '../../../shared/models/card.model.ts'

export class PlayerList {
  private players: Map<WebSocket, Player>

  constructor() {
    this.players = new Map()
  }

  add(webSocket: WebSocket, player: Player) {
    this.players.set(webSocket, player)
  }

  remove(webSocket: WebSocket) {
    this.players.delete(webSocket)
  }

  isTurnOf(id: Player["id"], turn: number) {
    const playerIndex = this.values.findIndex((player) => player.id === id)

    return playerIndex === turn
  }

  isCardIn(card: Card) {
    return this.players
      .values()
      .some((player) => player.cards.some((c) => c.id === card.id))
  }

  getRandomPlayer() {
    return this.values[Math.floor(Math.random() * this.values.length)]
  }

  get areAllReady() {
    return this.players.values().every((player) => player.isReady)
  }

  get values() {
    return Array.from(this.players.values())
  }

  get keys() {
    return Array.from(this.players.keys())
  }

  get size() {
    return this.players.size
  }
}
