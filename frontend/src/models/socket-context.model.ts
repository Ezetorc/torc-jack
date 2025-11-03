import type { Dispatch, SetStateAction } from "react";
import type { PlayerList } from "../models/player-list.model";

export type SocketContext = {
  setPlayers: Dispatch<SetStateAction<PlayerList | null>>;
  setPot: Dispatch<SetStateAction<number>>;
  setConnected: Dispatch<SetStateAction<boolean>>;
  name: string
}
