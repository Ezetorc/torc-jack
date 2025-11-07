import type { Player } from "../../../shared/models/player.model";
import type { PlayerList } from "./player-list.model";

export type GameContext = {
  players?: PlayerList
  connected: boolean
  setPlayers: (players: PlayerList) => void;
  setConnected: (connected: boolean) => void;
  setUser: (user: Player) => void;
}
