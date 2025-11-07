import { Player } from "../.././shared/models/player.model.ts"
import { GameContext } from "./models/game-context.model.ts";
import { onOpen } from "./events/on-open.event.ts";
import { onClose } from "./events/on-close.event.ts";
import { onMessage } from "./events/on-message.event.ts";
import { onError } from "./events/on-error.event.ts";
import { buildPlayer } from "./utilities/build-player.utility.ts";

const players = new Map<WebSocket, Player>()
const pot = 0

export function onConnect(ws: WebSocket) {
  const user = buildPlayer()
  const context: GameContext = { players, pot, ws, user }

  players.set(ws, user)

  ws.onmessage = (event) => onMessage(context, event)
  ws.onerror = (event) => onError(event)
  ws.onclose = () => onClose(context)
  ws.onopen = () => onOpen(context)
}

Deno.serve((request) => {
  if (request.headers.get("upgrade") != "websocket") {
    return new Response("Expected websocket", { status: 426 });
  }

  const { socket, response } = Deno.upgradeWebSocket(request);

  onConnect(socket);

  return response;
});

