import { Request } from "../../../shared/models/request.model.ts";
import { ErrorResponse } from "../../../shared/responses/error.response.ts";
import { GameContext } from "../models/game-context.model.ts";
import { ResponseService } from "../services/response.service.ts";

const actions: { [key in Request['type']]: (context: GameContext) => void } = {
  hit: (context: GameContext) => ResponseService.update(context),
  stand: (context: GameContext) => ResponseService.update(context),
}

export function onMessage(context: GameContext, event: MessageEvent) {
  try {
    const request = JSON.parse(event.data) as Request

    actions[request.type](context)
  } catch (error) {
    console.error(error)
    context.ws.send(JSON.stringify({ type: 'error', message: error } as ErrorResponse))
  }
}