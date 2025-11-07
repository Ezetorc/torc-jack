import { Player } from "../../../shared/models/player.model.ts";

export function buildPlayer() {
  const id = crypto.randomUUID()
  const name = `Jack-${id.slice(0, 4)}`
  return new Player({ id, name })
}