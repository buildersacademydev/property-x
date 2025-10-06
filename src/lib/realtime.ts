import { InferRealtimeEvents, Realtime } from "@upstash/realtime"
import z from "zod"

import { redis } from "./redis"

const schema = {
  notification: z.object({
    alert: z.string(),
  }),
}

export const realtime = new Realtime({ schema, redis })
export type RealtimeEvents = InferRealtimeEvents<typeof realtime>
