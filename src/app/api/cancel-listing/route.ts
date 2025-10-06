import { db } from "@/db/drizzle"
import { listings } from "@/db/schema"
import { TCancelListingPayload } from "@/services/type"
import { StacksPayload } from "@hirosystems/chainhook-client"
import { and, eq } from "drizzle-orm"
import { revalidatePath, revalidateTag } from "next/cache"
import {
  debugConsole,
  processRouteTransactions,
  sendRealtimeNotification,
} from "@/lib/utils"

export async function POST(request: Request) {
  const id = crypto.randomUUID()
  try {
    await sendRealtimeNotification({
      id,
      status: "pending",
      title: "Cancelling Listing",
      message: "Processing cancellation...",
    })

    const payload: StacksPayload = await request.json()
    if (!payload.apply || !Array.isArray(payload.apply)) {
      await sendRealtimeNotification({
        id,
        status: "error",
        title: "Cancelling Listing",
        message: "Invalid payload structure",
      })
      return new Response("Invalid payload structure", { status: 400 })
    }
    const transactions = payload.apply.map((tx) => tx.transactions).flat()
    console.log("Transactions in cancel listing:", debugConsole(transactions))
    const processedValues = processRouteTransactions<TCancelListingPayload>({
      transactions,
    })
    console.log(
      "Processed cancel listing payload: ",
      debugConsole(processedValues)
    )

    if (processedValues.length === 0) {
      await sendRealtimeNotification({
        id,
        status: "error",
        title: "Cancelling Listing",
        message: "No valid cancel listing transactions found",
      })
      return new Response("No valid cancel listing transactions found", {
        status: 400,
      })
    }

    const valid = processedValues.filter(
      (v) =>
        typeof v["listing-id"] === "number" &&
        typeof v["ft-asset-contract"] === "string" &&
        v["ft-asset-contract"].length > 0 &&
        typeof v.topic === "string" &&
        v.topic.toLowerCase().includes("cancel")
    )

    if (valid.length === 0) {
      await sendRealtimeNotification({
        id,
        status: "error",
        title: "Cancelling Listing",
        message: "No valid cancel listing entries after validation",
      })
      return new Response("No valid cancel listing entries after validation", {
        status: 400,
      })
    }

    const dedupedMap = new Map<string, TCancelListingPayload>()
    for (const v of valid) {
      dedupedMap.set(`${v["listing-id"]}-${v["ft-asset-contract"]}`, v)
    }
    const deduped = Array.from(dedupedMap.values())

    const operations = deduped.map((v) =>
      db
        .delete(listings)
        .where(
          and(
            eq(listings.listingId, v["listing-id"]),
            eq(listings.assetContract, v["ft-asset-contract"])
          )
        )
    )

    await Promise.all(operations)

    revalidateTag("listings")
    revalidateTag("ft-balances")
    revalidateTag("apts")
    revalidatePath("/your-listings")

    await sendRealtimeNotification({
      id,
      status: "success",
      title: "Listing Cancelled",
      message: "Listing cancelled successfully",
      tag: "apts",
    })

    return new Response("Cancel listing successful", { status: 200 })
  } catch (error) {
    console.error("Error processing cancel listing:", error)
    await sendRealtimeNotification({
      id,
      status: "error",
      title: "Cancelling Listing",
      message: "Internal server error",
    })
    return new Response("Internal server error", { status: 500 })
  }
}
