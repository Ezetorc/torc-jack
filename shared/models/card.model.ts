export class Card {
	value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
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

	static getRandom() {
		const randomValue = Math.floor(Math.random() * 11) + 1
		const randomSuit = Math.floor(Math.random() * 4)
		const value = randomValue as Card['value']
		const suit = ['hearts', 'diamonds', 'clubs', 'spades'][
			randomSuit
		] as Card['suit']

		return new Card({ value, suit })
	}
}
