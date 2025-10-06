"use client"

import { useRealtime } from "@upstash/realtime/client"
import type { RealtimeEvents } from "@/lib/realtime"

export default function Notifications() {
  useRealtime<RealtimeEvents>({
    events: {
      notification: {
        alert: (data) => console.log(data),
      },
    },
  })

  return <div>Listening for events...</div>
}
