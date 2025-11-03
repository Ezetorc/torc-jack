import { getSocket } from "../configuration/socket.configuration";
import { PlayerList } from "../models/player-list.model";
import { Player } from "../../../shared/models/player.model"
import type { SocketContext } from "../models/socket-context.model";
import type { UpdateResponse } from "../../../shared/responses/update.response";
import type { WelcomeResponse } from "../../../shared/responses/welcome.response";
import type { ErrorResponse } from "../../../shared/responses/error.response";
import type { Request } from "../../../shared/models/request.model";

export class SocketService {
  socket: WebSocket;
  context: SocketContext;

  constructor(context: SocketContext) {
    this.context = context;
    this.socket = getSocket(context.name);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
  }

  send(request: Request) {
    this.socket.send(JSON.stringify(request));
  }

  onClose() {
    console.log("🔴 Desconectado del servidor");
    this.context.setConnected(false);
  }

  onOpen() {
    console.log("🟢 Conectado al servidor");
    this.context.setConnected(true);
  }

  onWelcome(data: WelcomeResponse) {
    this.context.setPlayers((prev) => new PlayerList([...prev?.all ?? [], new Player({ id: data.id, name: data.name })]));
  }

  onUpdate(data: UpdateResponse) {
    console.log(data)
    this.context.setPlayers(new PlayerList(data.players));
    this.context.setPot(data.pot ?? 0);
  }

  onError(data: ErrorResponse) {
    console.error(data.message);
  }

  onMessage(event: MessageEvent) {
    try {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "welcome":
          this.onWelcome(data);
          break;
        case "update":
          this.onUpdate(data);
          break;
        case "error":
          this.onError(data);
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }
}