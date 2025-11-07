import { useUserStore } from "../stores/user.store";

export function useUser() {
  const userStore = useUserStore()

  return { ...userStore }
}