import { getSocket } from '../configuration/socket.configuration'
import type { Request } from '../../../shared/models/request.model'
import type { EventContext } from '../models/event-context.model'
import type { Response } from '../../../shared/models/response.model'
import { onDisconnect } from '../events/on-disconnect.event'
import { onError } from '../events/on-error.event'

export class SocketService {
	private socket: WebSocket | null = null
	private eventHandlers: Record<
		string,
		(response: any, context: EventContext) => void
	> = {}

	constructor(
		private readonly playerName: string,
		private readonly eventContext: EventContext
	) {}

	async connect(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.socket = getSocket(this.playerName)

			this.socket.onopen = () => {
				console.log('🟢 Connected to server')
				resolve()
			}

			this.socket.onclose = (event) => {
				console.log('🔴 Disconnected from server')
				onDisconnect(event, this.eventContext)
			}

			this.socket.onerror = (event) => {
				console.error('❌ Error in WebSocket', event)

				if (event instanceof ErrorEvent) {
					onError(event, this.eventContext)
				}

				reject(event)
			}

			this.socket.onmessage = this.handleMessage.bind(this)
		})
	}

	on(event: string, handler: (data: any) => void) {
		this.eventHandlers[event] = handler
	}

	send(request: Request) {
		try {
			if (this.socket?.readyState === WebSocket.OPEN) {
				this.socket.send(JSON.stringify(request))
			} else {
				console.warn("⚠️ Can't send, socket closed.")
			}
		} catch (error) {
			console.error('❌ Error sending message:', error)
		}
	}

	private handleMessage(event: MessageEvent) {
		try {
			const response = JSON.parse(event.data) as Response
			const handler = this.eventHandlers[response.type]

			if (handler) handler(response, this.eventContext)
			else console.warn(`⚠️ Event not handled: ${response.type}`)
		} catch (error) {
			console.error('❌ Error processing message:', error)
		}
	}

	close() {
		this.socket?.close()
	}
}
