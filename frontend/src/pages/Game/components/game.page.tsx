import { Button } from '../../../components/Button'
import { useUserStore } from '../../../stores/user.store'
import { useGameStore } from '../../../stores/game.store'

export default function GamePage() {
  const { connected, userId } = useUserStore()
  const { players, socket, turn } = useGameStore()

  if (!connected) return

  const isTurn = turn !== undefined && turn >= 0 && players?.[turn]?.id === userId

  const onHit = () => {
    if (!isTurn) return

    socket?.send({ type: 'hit' })
  }

  const onStand = () => {
    if (!isTurn) return

    socket?.send({ type: 'stand' })
  }

  return (
    <main className='relative grid place-content-center h-screen'>
      <section className='relative grid gap-16 w-[600px] grid-cols-2 grid-rows-2'>
        {players?.map((player) => {
          const isTurnValid = turn !== undefined && turn >= 0
          const isTurn = isTurnValid && players?.[turn]?.id === player.id

          return (
            <article
              key={player.id}
              className={`rounded-2xl text-2xl p-4 ${player.id === userId ? 'bg-red-400' : 'bg-blue-600'}`}
            >
              <h2>{player.name} {isTurn && "⭐"}</h2>

              {player.cards.map((card) => (
                <div key={card.id} className='text-xl'>
                  {card.value} of {card.suit}
                </div>
              ))}

              <div>Value: {player.value}</div>
            </article>
          )
        })}
      </section>

      <div className='fixed h-44 flex items-center justify-center gap-x-12 w-full bottom-0 right-0'>
        <Button
          className={`text-2xl ${!isTurn ? 'bg-gray-600 hover:cursor-not-allowed hover:translate-y-0' : 'bg-blue-600 hover:bg-white hover:text-blue-600'}`}
          onClick={onStand}
          disabled={!isTurn}
        >
          Quedarse
        </Button>

        <Button
          className={`text-2xl ${!isTurn ? 'bg-gray-600 hover:cursor-not-allowed hover:translate-y-0' : 'bg-blue-600 hover:bg-white hover:text-blue-600'}`}
          onClick={onHit}
          disabled={!isTurn}
        >
          Pedir carta
        </Button>
      </div>
    </main>
  )
}
