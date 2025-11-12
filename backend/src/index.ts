import { onConnect } from './events/on-connect.event.ts'
import { onDisconnect } from './events/on-disconnect.event.ts'
import { onMessage } from './events/on-message.event.ts'
import { onError } from './events/on-error.event.ts'
import { buildPlayer } from './utilities/build-player.utility.ts'
import { PlayerList } from './models/player-list.model.ts'
import type { EventContext } from './models/event-context.model.ts'
// # Repartir dos cartas a cada jugador (una carta invisible del dealer)
// Turno del primer jugador, elige si agarrar una carta más o quedarse
// Si se queda, continúa el siguiente jugador
// Si agarra una carta más > Si se pasa, pierde, si no, vuelve a decidir
// Si todos se quedarón, el dealer revela su carta
// Si el dealer se pasa, todos ganan
// Si el dealer no se pasa, el dealer gana

const players = new PlayerList()
const gameContext: EventContext['game'] = {
  players,
  started: false,
  turn: 0
}

Deno.serve((request) => {
  if (request.headers.get('upgrade') !== 'websocket') {
    return new Response('Expected websocket', { status: 426 })
  }

  const { socket: webSocket, response } = Deno.upgradeWebSocket(request)
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('name') ?? 'Anonymous'
  const user = buildPlayer(username)
  const connectionContext: EventContext['connection'] = {
    user,
    webSocket
  }
  const eventContext: EventContext = {
    connection: connectionContext,
    game: gameContext
  }

  players.add(webSocket, user)
  webSocket.onmessage = (event) => onMessage(eventContext, event)
  webSocket.onerror = (event) => onError(event)
  webSocket.onclose = () => onDisconnect(eventContext)
  webSocket.onopen = () => onConnect(eventContext)

  return response
})
