"use server"

import { revalidateTag } from "next/cache"
import { RealtimeEvents } from "@/lib/realtime"

export async function revalidateData(
  tag: RealtimeEvents["notification"]["data"]["tag"]
) {
  if (!tag) return
  if (Array.isArray(tag) && tag.length > 0) {
    tag.forEach((t) => revalidateTag(t))
  } else if (typeof tag === "string") {
    revalidateTag(tag)
  }
}
