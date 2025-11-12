import { useState, type FormEvent } from 'react'
import { Button } from '../../../components/Button'
import { useLocation } from 'wouter'
import { useConnection } from '../hooks/use-connection.hook'
import { useUserStore } from '../../../stores/user.store'

export default function MainPage() {
	const [name, setName] = useState('')
	const [error, setError] = useState('')
	const { connected } = useUserStore()
	const connect = useConnection()
	const [, setLocation] = useLocation()

	const onEnterGame = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		try {
			await connect(name)
			setLocation('/room')
		} catch (error) {
			setError('No se pudo conectar al servidor')
			console.error(error)
		}
	}

	return (
		<section className='grid place-content-center h-full w-full'>
			<form
				className='flex flex-col items-center justify-center gap-y-[32px] w-full h-full'
				onSubmit={onEnterGame}
			>
				<h1 className='text-7xl mb-4 font-bold'>🃏 TorcJack</h1>
				<input
					className='border rounded p-3 w-full bg-green-600 text-2xl'
					value={name}
					required
					onChange={(event) => setName(event.target.value)}
					placeholder='Tu nombre...'
				/>

				<Button
					className='bg-blue-600 w-full hover:bg-white hover:text-blue-600 text-2xl'
					disabled={connected}
					type='submit'
				>
					Entrar a la partida
				</Button>

				<p className='text-red-400 text-[18px] w-full h-5'>{error}</p>
			</form>
		</section>
	)
}
