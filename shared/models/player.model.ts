import type { Card } from "../../shared/models/card.model"

export class Player {
  id: `${string}-${string}-${string}-${string}-${string}`
  name: string
  isDealer: boolean
  chips: number
  cards: Card[]
  lastAction: 'fold' | 'check' | 'call' | 'raise'

  constructor(props: {
    id: Player['id']
    name: Player['name']
    isDealer?: Player['isDealer']
    chips?: Player['chips']
    cards?: Player['cards']
  }) {
    this.id = props.id
    this.name = props.name
    this.isDealer = props.isDealer || false
    this.chips = props.chips || 2000
    this.cards = props.cards || []
    this.lastAction = 'check'
  }

  has(card: Card) {
    return this.cards.some((c) => c.id === card.id)
  }

  get hasCompleteDeck() {
    return this.cards.length === 2
  }
}
