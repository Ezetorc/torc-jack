import type { UpdateResponse } from '../../../shared/responses/update.response.ts'
import type { StartResponse } from '../../../shared/responses/start.response.ts'
import type { EventContext } from '../models/event-context.model.ts'

export class ResponseService {
  static update(context: EventContext) {
    const players = context.game.players.values
    const response: UpdateResponse = {
      type: 'update',
      players,
      turn: context.game.turn
    }
    const payload = JSON.stringify(response)

    for (const socket of context.game.players.keys) {
      if (socket.readyState !== WebSocket.OPEN) {
        context.game.players.remove(socket)
        continue
      }

      try {
        socket.send(payload)
      } catch (error) {
        console.error('Broadcast send failed; pruning socket', error)
        context.game.players.remove(socket)
      }
    }
  }

  static nextTurn(context: EventContext) {
    const players = context.game.players.values
    context.game.turn = (context.game.turn + 1) % players.length
    const response: UpdateResponse = {
      type: 'update',
      players,
      turn: context.game.turn
    }
    const payload = JSON.stringify(response)

    for (const socket of context.game.players.keys) {
      if (socket.readyState !== WebSocket.OPEN) {
        context.game.players.remove(socket)
        continue
      }

      try {
        socket.send(payload)
      } catch (error) {
        console.error('Broadcast send failed; pruning socket', error)
        context.game.players.remove(socket)
      }
    }
  }

  static start(context: EventContext) {
    for (const socket of context.game.players.keys) {
      if (socket.readyState !== WebSocket.OPEN) {
        context.game.players.remove(socket)
        continue
      }

      const response: StartResponse = { type: 'start' }
      const payload = JSON.stringify(response)

      try {
        socket.send(payload)
      } catch (error) {
        console.error('Broadcast send failed; pruning socket', error)
        context.game.players.remove(socket)
      }
    }
  }
}
