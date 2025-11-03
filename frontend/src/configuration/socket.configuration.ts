import { env } from "./env.configuration";

export const getSocket = (name: string) => new WebSocket(
  `${env.apiUrl}?name=${encodeURIComponent(name)}`
)