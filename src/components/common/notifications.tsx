"use client"

import { revalidateData } from "@/db/actions/revalidate-data"
import { useRealtime } from "@upstash/realtime/client"
import type { RealtimeEvents } from "@/lib/realtime"

import { customToast } from "./custom-toast"

export default function Notifications() {
  useRealtime<RealtimeEvents>({
    events: {
      notification: {
        data: (data) => {
          if (data.status === "pending") {
            customToast.pending(data.title, {
              description: data.message,
            })
          } else if (data.status === "success") {
            customToast.success(data.title, {
              description: data.message,
            })
            if (data.tag) {
              revalidateData("apts")
            }
          } else if (data.status === "error") {
            customToast.error(data.title, {
              description: data.message,
            })
          }
        },
      },
    },
  })

  return null
}
