import { useCallback } from 'react'
import { SocketService } from '../../../services/socket.service'
import { eventHandlers } from '../../../events'
import type { EventContext } from '../../../models/event-context.model'
import { useUserStore } from '../../../stores/user.store'
import { useGameStore } from '../../../stores/game.store'
import { useLocation } from 'wouter'

export function useConnection() {
  const { setConnected } = useUserStore()
  const { setSocket, socket } = useGameStore()
  const [, setLocation] = useLocation()

  return useCallback(
    async (playerName: string) => {
      if (!playerName) throw new Error("User's name is missing")
      if (socket) return

      const eventContext: EventContext = {
        get userId() {
          return useUserStore.getState().userId
        },
        get players() {
          return useGameStore.getState().players
        },
        setUserId: useUserStore.getState().setUserId,
        setPlayers: useGameStore.getState().setPlayers,
        setLocation,
        setConnected: useUserStore.getState().setConnected,
        setTurn: useGameStore.getState().setTurn
      }

      const service = new SocketService(playerName, eventContext)
      await service.connect()

      for (const [event, handler] of Object.entries(eventHandlers)) {
        service.on(event, (data) => handler(data, eventContext))
      }

      setSocket(service)
      setConnected(true)
    },
    [setSocket, setConnected, setLocation, socket]
  )
}
