import { Button } from './components/Button'
import { PlayerList } from './models/PlayerList'
import { useState, useRef } from 'react'
import { Player } from './models/Player'

export default function App() {
	const [players, setPlayers] = useState<PlayerList | null>(null)
	const [me, setMe] = useState<Player | null>(null)
	const [pot, setPot] = useState(0)
	const [name, setName] = useState('')
	const [connected, setConnected] = useState(false)
	const socketRef = useRef<WebSocket | null>(null)

	// 🔌 Conexión al servidor cuando el jugador pone su nombre
	const connect = () => {
		const socket = new WebSocket(
			`ws://localhost:3000?name=${encodeURIComponent(name)}`
		)
		socketRef.current = socket

		socket.onopen = () => {
			console.log('Conectado al servidor')
			setConnected(true)
		}

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data)
			console.log('📩', data)

			switch (data.type) {
				case 'welcome':
					setMe(new Player(data.player))
					break
				case 'state:update':
					setPlayers(new PlayerList(data.players))
					setPot(data.pot)
					break
			}
		}

		socket.onclose = () => {
			console.log('Desconectado del servidor')
			setConnected(false)
		}
	}

	const sendAction = (action: string) => {
		socketRef.current?.send(JSON.stringify({ action }))
	}

	// 👇 UI
	if (!connected) {
		return (
			<main className='grid place-content-center h-screen text-center'>
				<h1 className='text-3xl mb-4'>🃏 Blackjack</h1>
				<input
					className='border rounded p-2 text-lg'
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder='Tu nombre...'
				/>
				<Button className='bg-blue-600 mt-4' onClick={connect} disabled={!name}>
					Entrar a la partida
				</Button>
			</main>
		)
	}

	return (
		<main className='relative grid place-content-center h-screen'>
			<section className='relative grid gap-16 w-[600px] grid-cols-2 grid-rows-2'>
				{players?.all.map((player) => (
					<article
						key={player.id}
						className={`rounded-2xl text-2xl p-4 ${
							me?.id === player.id ? 'bg-green-700' : 'bg-blue-600'
						}`}
					>
						<h2>{player.name}</h2>
						<p>${player.chips}</p>

						{player.cards.map((card) => (
							<div key={card.id} className='text-xl'>
								{card.value} of {card.suit}
							</div>
						))}
					</article>
				))}

				<div className='absolute w-full h-full flex items-center justify-center'>
					<div className='bg-red-500 p-4 rounded-2xl text-2xl'>${pot}</div>
				</div>
			</section>

			<div className='fixed h-44 flex items-center justify-center gap-x-12 w-full bottom-0 right-0'>
				<Button onClick={() => sendAction('stand')} className='bg-green-500'>
					Quedarse
				</Button>
				<Button onClick={() => sendAction('hit')} className='bg-blue-500'>
					Pedir carta
				</Button>
			</div>
		</main>
	)
}
