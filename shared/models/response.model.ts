import type { ConnectResponse } from "../responses/connect.response"
import { type UpdateResponse } from "../responses/update.response"
import type { StartResponse } from "../responses/start.response"
import type { ErrorResponse } from "../responses/error.response"

export type Response = UpdateResponse | ConnectResponse | StartResponse | ErrorResponse