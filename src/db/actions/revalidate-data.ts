"use server"

import { revalidateTag } from "next/cache"

export async function revalidateData(tag: string) {
  revalidateTag(tag)
  console.log(`Revalidated tag: ${tag}`)
}
