import { db } from "@/db/drizzle"
import { listings } from "@/db/schema"
import { TFtStxBuyPayload } from "@/services/type"
import { StacksPayload } from "@hirosystems/chainhook-client"
import { eq } from "drizzle-orm"
import { revalidateTag } from "next/cache"
import {
  convertAmount,
  processRouteTransactions,
  sendRealtimeNotification,
} from "@/lib/utils"

export async function POST(request: Request) {
  try {
    await sendRealtimeNotification({
      status: "pending",
      title: "Fulfill Listing STX",
      message: "Processing listing fulfillment...",
      tag: "fulfill-listing-stx",
    })
    const payload: StacksPayload = await request.json()
    if (!payload.apply || !Array.isArray(payload.apply)) {
      return new Response("Invalid payload structure", { status: 400 })
    }
    const transactions = payload.apply.map((tx) => tx.transactions).flat()

    const processedValues = processRouteTransactions<TFtStxBuyPayload>({
      transactions,
    })

    if (processedValues.length === 0) {
      await sendRealtimeNotification({
        status: "error",
        title: "Fulfill Listing STX",
        message: "No valid listing transactions found",
        tag: "fulfill-listing-stx",
      })

      return new Response("No valid listing transactions found", {
        status: 400,
      })
    }

    const ops = processedValues
      .filter(
        (v) =>
          typeof v["listing-id"] === "number" &&
          typeof v["remaining-amt"] === "number"
      )
      .map((v) => {
        const listingId = v["listing-id"]
        const remaining = v["remaining-amt"]

        if (remaining === 0) {
          return db.delete(listings).where(eq(listings.listingId, listingId))
        }

        return db
          .update(listings)
          .set({ amount: convertAmount(remaining) })
          .where(eq(listings.listingId, listingId))
      })

    await Promise.all(ops)

    await sendRealtimeNotification({
      status: "success",
      title: "Fulfill Listing STX",
      message: "Listing fulfillment processed successfully",
      tag: "fulfill-listing-stx",
    })

    return new Response("Token Buy successful", { status: 200 })
  } catch (error) {
    await sendRealtimeNotification({
      status: "error",
      title: "Fulfill Listing STX",
      message: "Internal server error",
      tag: "fulfill-listing-stx",
    })
    console.error("Error in fulfill-listing-stx:", error)
    return new Response("Internal server error", { status: 500 })
  }
}
