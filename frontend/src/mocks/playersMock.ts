import { Player } from '../models/Player'

export const playersMock = [
	new Player({
		name: 'Ezequias',
		isDealer: false,
		chips: 2000
	}),
	new Player({
		name: 'Mateo',
		isDealer: true,
		chips: 5000
	}),
	new Player({
		name: 'Nacho',
		isDealer: false,
		chips: 5000
	}),
	new Player({
		name: 'Nahuel',
		isDealer: false,
		chips: 10000
	})
]
