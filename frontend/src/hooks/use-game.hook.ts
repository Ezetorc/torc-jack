import { useGameStore } from "../stores/game.store";

export function useGame() {
  const gameStore = useGameStore()

  return { ...gameStore }
}