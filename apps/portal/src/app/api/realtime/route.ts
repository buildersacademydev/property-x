import { handle } from "@upstash/realtime"
import { realtime } from "@/lib/realtime/realtime"

export const GET = handle({
  realtime,
})
