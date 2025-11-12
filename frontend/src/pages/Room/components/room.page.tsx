import { Button } from '../../../components/Button'
import { useUserStore } from '../../../stores/user.store'
import { useGameStore } from '../../../stores/game.store'

export default function RoomPage() {
	const { userId } = useUserStore()
	const { socket, players } = useGameStore()
	const isUserReady = players?.find((player) => player.id === userId)?.isReady

	const handleReady = () => {
		socket?.send({ type: 'ready' })
	}

	return (
		<section className='grid place-content-center h-full w-full'>
			<div className='flex flex-col items-center justify-center gap-y-[32px] w-full h-full'>
				<h1 className='text-7xl mb-4 font-bold'>🃏 Room</h1>

				<ul className='w-full min-h-[150px]'>
					{players?.map((player) => (
						<li
							className='odd:bg-blue-700 not-odd:bg-blue-900 p-2 w-full text-2xl flex justify-between'
							key={player.id}
						>
							<span>{player.name}</span>
							<span className=''>{player.isReady ? '✅' : '❌'}</span>
						</li>
					))}
				</ul>

				<Button
					className={`w-full text-2xl ${isUserReady ? 'bg-gray-600 hover:cursor-not-allowed hover:translate-y-0' : 'bg-blue-600 hover:bg-white hover:text-blue-600'}`}
					onClick={handleReady}
					disabled={isUserReady}
				>
					{isUserReady ? 'Ya estas listo' : 'Estoy listo'}
				</Button>
			</div>
		</section>
	)
}
