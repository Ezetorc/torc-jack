import { Button } from './components/Button'
import { PlayerList } from './models/player-list.model'
import { useRef, useState } from 'react'
import type { Request } from "../../shared/models/request.model"
import { SocketService } from './services/socket.service'

export default function App() {
  const [players, setPlayers] = useState<PlayerList | null>(null)
  const [pot, setPot] = useState(0)
  const [name, setName] = useState('')
  const user = players?.all.find((player) => player.name === name)
  const [connected, setConnected] = useState(false)
  const socket = useRef<SocketService | null>(null)

  const connect = () => {
    socket.current = new SocketService({ name, setPlayers, setPot, setConnected })
  }

  const sendAction = (request: Request) => {
    socket.current?.send(request)
  }

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
            className={`rounded-2xl text-2xl p-4 ${user?.id === player.id ? 'bg-green-700' : 'bg-blue-600'
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
        <Button onClick={() => sendAction({ type: 'stand' })} className='bg-green-500'>
          Quedarse
        </Button>
        <Button onClick={() => sendAction({ type: 'hit' })} className='bg-blue-500'>
          Pedir carta
        </Button>
      </div>
    </main>
  )
}
