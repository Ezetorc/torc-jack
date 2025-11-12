export class Card {
  value: "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K"
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades'
  id: `${Card['value']}${Card['suit']}`

  constructor(props: {
    value: Card['value']
    suit: Card['suit']
  }) {
    this.value = props.value
    this.suit = props.suit
    this.id = `${props.value}${props.suit}`
  }

  static valueMap = {
    "A": 11 | 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 10,
    "Q": 10,
    "K": 10
  }

  static getRandom() {
    const value = this.getRandomValue()
    const suit = this.getRandomSuit()

    return new Card({ value, suit })
  }

  static getRandomValue() {
    const randomValue = Math.floor(Math.random() * 12)
    return ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"][randomValue] as Card['value']
  }

  static getRandomSuit() {
    const randomSuit = Math.floor(Math.random() * 4)
    return ['hearts', 'diamonds', 'clubs', 'spades'][randomSuit] as Card['suit']
  }
}