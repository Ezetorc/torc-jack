import type { ConnectResponse } from '../../../shared/responses/connect.response.ts'
import type { EventContext } from '../models/event-context.model.ts'
import { ResponseService } from '../services/response.service.ts'

export function onConnect(context: EventContext) {
  console.log(`${context.connection.user.name} connected`)

  const payload: ConnectResponse = {
    type: 'connect',
    user: { id: context.connection.user.id, name: context.connection.user.name }
  }

  context.connection.webSocket.send(JSON.stringify(payload))
  ResponseService.update(context)
}
