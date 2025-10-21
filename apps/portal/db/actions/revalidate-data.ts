"use server"

import { revalidateTag } from "next/cache"
import { RealtimeEvents } from "@/lib/realtime/realtime"

export async function revalidateData(
    tag: RealtimeEvents["notification"]["data"]["tag"]
) {
    if (!tag) return
    if (Array.isArray(tag) && tag.length > 0) {
        tag.forEach((t) => revalidateTag(t))
        console.log("Revalidated tags:", tag)
    } else if (typeof tag === "string") {
        console.log("Revalidated tag:", tag)
        revalidateTag(tag)
    }
}
