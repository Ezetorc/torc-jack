import { Card } from "../../shared/models/card.model.ts"

export class Player {
  id: `${string}-${string}-${string}-${string}-${string}`
  name: string
  cards: Card[]
  isReady: boolean

  constructor(props: {
    id: Player['id']
    name: Player['name']
    cards?: Player['cards']
    isReady?: Player['isReady']
  }) {
    this.id = props.id
    this.name = props.name
    this.cards = props.cards || []
    this.isReady = props.isReady || false
  }

  get value() {
    const value = this.cards.reduce((acc, card) => acc + Card.valueMap[card.value], 0)

    return value > 21 ? value - 10 : value
  }

  get hasCompleteDeck() {
    return this.cards.length === 2
  }
}
