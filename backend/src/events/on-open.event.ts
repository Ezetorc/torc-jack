import { WelcomeResponse } from "../../../shared/responses/welcome.response.ts";
import { GameContext } from "../models/game-context.model.ts";
import { ResponseService } from "../services/response.service.ts";

export function onOpen(context: GameContext) {
  console.log(`${context.user.name} connected`)

  const payload: WelcomeResponse = {
    type: 'welcome',
    user: { id: context.user.id, name: context.user.name }
  }

  context.ws.send(JSON.stringify(payload))
  ResponseService.update(context)
}