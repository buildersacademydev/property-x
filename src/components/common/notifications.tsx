"use client"

import { revalidateData } from "@/db/actions/revalidate-data"
import { useRealtime } from "@upstash/realtime/client"
import { toast } from "sonner"
import type { RealtimeEvents } from "@/lib/realtime"

import { Icons } from "./icons"

export default function Notifications() {
  useRealtime<RealtimeEvents>({
    events: {
      notification: {
        data: (data) => {
          if (data.status === "pending") {
            realtimeToast.pending(data.title, {
              id: data.id,
              description: data.message,
            })
          } else if (data.status === "success") {
            realtimeToast.success(data.title, {
              id: data.id,
              description: data.message,
            })
            if (data.tag) {
              revalidateData(data.tag)
            }
          } else if (data.status === "error") {
            realtimeToast.error(data.title, {
              id: data.id,
              description: data.message,
            })
          }
        },
      },
    },
  })

  return null
}

type ToastOptions = {
  description: string
  duration?: number
  id: string
}

const realtimeToast = {
  success: (message: string, options?: ToastOptions) => {
    return toast(message, {
      id: options?.id,
      description: options?.description,
      duration: options?.duration || 4000,
      icon: <Icons.success />,
      style: {
        background: "oklch(0.594 0.0443 196.0233)",
        color: "oklch(1 0 0)",
        border: "1px solid oklch(0.594 0.0443 196.0233)",
      },
      className:
        "dark:bg-[oklch(0.594_0.0443_196.0233)] dark:text-white dark:border-[oklch(0.594_0.0443_196.0233)]",
    })
  },

  error: (message: string, options?: ToastOptions) => {
    return toast(message, {
      id: options?.id,
      description: options?.description,
      duration: options?.duration || 5000,
      icon: <Icons.error />,
      style: {
        background: "oklch(0.35 0.18 25.33)",
        color: "oklch(0.96 0.02 95)",
        border: "1px solid oklch(0.35 0.18 25.33)",
      },
      className:
        "dark:bg-[oklch(0.35_0.18_25.33)] dark:text-[oklch(0.96_0.02_95)] dark:border-[oklch(0.35_0.18_25.33)]",
    })
  },

  pending: (message: string, options?: ToastOptions) => {
    return toast(message, {
      id: options?.id,
      description: options?.description,
      duration: Number.POSITIVE_INFINITY,
      icon: <Icons.spinner />,
      style: {
        background: "oklch(0.252 0 0)",
        color: "oklch(0.8109 0 0)",
        border: "1px solid oklch(0.252 0 0)",
      },
      className:
        "dark:bg-[oklch(0.252_0_0)] dark:text-[oklch(0.8109_0_0)] dark:border-[oklch(0.252_0_0)]",
    })
  },
}
