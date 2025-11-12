import type { HitRequest } from "../requests/hit.request"
import type { StandRequest } from "../requests/stand.request"
import type { ReadyRequest } from "../requests/ready.request"

export type Request = HitRequest | StandRequest | ReadyRequest