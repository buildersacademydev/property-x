"use client"

import { useRealtime } from "@upstash/realtime/client"
import { toast } from "sonner"
import { RealtimeEvents } from "@/lib/realtime/realtime"
import { Icons } from "@workspace/ui/components/icons"
import { revalidateData } from "@/db/actions/revalidate-data"

export default function Notifications({ wallet }: { wallet: string | null }) {
    console.log('wallet in notifications', wallet)
    useRealtime<RealtimeEvents>({
        channels: [wallet || 'default'],
        event: 'notification',
        onData(data, channel) {
            console.log('notification received', data, channel)
            const finalData = data.data  
            if(finalData.status === "pending") {
                realtimeToast.pending(finalData.title, {
                    id: finalData.id,
                    description: finalData.message,
                })
            } else if(finalData.status === "success") {
                realtimeToast.success(finalData.title, {
                    id: finalData.id,
                    description: finalData.message,
                })
                if(finalData.tag) {
                    console.log("tag from notification:", finalData.tag)
                    revalidateData(finalData.tag)
                }
            } else if(finalData.status === "error") {
                realtimeToast.error(finalData.title, {
                    id: finalData.id,
                    description: finalData.message,
                })
            }
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
            duration: options?.duration || 5000,
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
            duration: options?.duration || 6000,
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
