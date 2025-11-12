import { Player } from '../../../shared/models/player.model.ts'

export function buildPlayer(name: string) {
	const id = crypto.randomUUID()
	return new Player({ id, name })
}
