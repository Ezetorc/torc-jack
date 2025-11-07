import type { Request } from "../../../../../shared/models/request.model";
import { Button } from "../../../components/Button";
import { useGame } from "../../../hooks/use-game.hook";
import { useUser } from "../../../hooks/use-user.hook";

export default function GamePage() {
  const { user } = useUser()
  const { players, pot, socket } = useGame()

  if (!socket || !user) return

  const sendAction = (request: Request) => {
    socket.send(request)
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