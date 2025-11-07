import { type ChangeEvent, useState } from "react";
import { Button } from "../../../components/Button";
import { SocketService } from "../../../services/socket.service";
import { useUser } from "../../../hooks/use-user.hook";
import { useGame } from "../../../hooks/use-game.hook";
import { useLocation } from "wouter";

export default function MainPage() {
  const [name, setName] = useState<string>("")
  const { setConnected, connected, setUser } = useUser()
  const { setSocket, setPlayers, setPot, players, pot } = useGame()
  const [, setLocation] = useLocation()

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onEnterGame = () => {
    if (!name) return

    const newSocket = new SocketService({ setPlayers, players, pot, setPot, setConnected, connected, setUser }, name)

    setSocket(newSocket)
    setLocation("/play")
  }

  return (
    <main className='grid place-content-center h-screen text-center'>
      <h1 className='text-3xl mb-4'>🃏 TorcJack</h1>
      <input
        className='border rounded p-2 text-lg'
        value={name}
        onChange={onChangeName}
        placeholder='Tu nombre...'
      />

      <Button className='bg-blue-600 mt-4' onClick={onEnterGame} disabled={!name}>
        Entrar a la partida
      </Button>
    </main>
  )
}