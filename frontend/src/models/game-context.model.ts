import type { Player } from "../../../shared/models/player.model";
import type { PlayerList } from "./player-list.model";

export type GameContext = {
  players?: PlayerList
  pot?: number
  connected: boolean
  setPlayers: (players: PlayerList) => void;
  setPot: (pot: number) => void;
  setConnected: (connected: boolean) => void;
  setUser: (user: Player) => void;
}
