import { Player } from "../.././shared/models/player.model.ts"
import type { WelcomeResponse } from "../../shared/responses/welcome.response.ts"
import type { UpdateResponse } from "../../shared/responses/update.response.ts"
import type { ErrorResponse } from "../../shared/responses/error.response.ts"
import type { Request } from "../../shared/models/request.model.ts"

const players = new Map<WebSocket, Player>()
const pot = 0

function update() {
  const payload = JSON.stringify({ type: 'update', players: Array.from(players.values()), pot } as UpdateResponse)
  for (const sock of players.keys()) {
    sock.send(payload)
  }
}

export function handleConnection(ws: WebSocket) {
  const id = crypto.randomUUID()

  players.set(ws, new Player({ id, name: `Jack-${id.slice(0, 4)}` }))
  const player = players.get(ws)

  if (!player) {
    console.error('Player not found')
    return
  }

  ws.onopen = () => {
    console.log(`${player.name} connected`)
    ws.send(JSON.stringify({ type: 'welcome', id, name: player.name } as WelcomeResponse))
    update()
  }

  ws.onmessage = (event: MessageEvent) => {
    try {
      const request = JSON.parse(event.data) as Request

      switch (request.type) {
        case 'hit':
          update()
          break;
        case 'stand':
          update()
          break;
      }
    } catch (error) {
      console.error(error)
      ws.send(JSON.stringify({ type: 'error', message: error } as ErrorResponse))
    }
  }

  ws.onclose = () => {
    console.log(`🔴 ${player.name} disconnected`)
    players.delete(ws)
    update()
  }
}

Deno.serve((request) => {
  if (request.headers.get("upgrade") != "websocket") {
    return new Response("Expected websocket", { status: 426 });
  }

  const { socket, response } = Deno.upgradeWebSocket(request);

  handleConnection(socket);

  return response;
});

