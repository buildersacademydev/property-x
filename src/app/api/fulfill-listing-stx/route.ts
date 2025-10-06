import { db } from "@/db/drizzle"
import { listings } from "@/db/schema"
import { TFtStxBuyPayload } from "@/services/type"
import { StacksPayload } from "@hirosystems/chainhook-client"
import { eq } from "drizzle-orm"
import {
  convertAmount,
  processRouteTransactions,
  sendRealtimeNotification,
} from "@/lib/utils"

export async function POST(request: Request) {
  const id = crypto.randomUUID()
  try {
    await sendRealtimeNotification({
      id,
      status: "pending",
      title: "Fulfilling Listing",
      message: "Processing purchase...",
    })

    const payload: StacksPayload = await request.json()
    if (!payload.apply || !Array.isArray(payload.apply)) {
      await sendRealtimeNotification({
        id,
        status: "error",
        title: "Fulfilling Listing",
        message: "Invalid payload structure",
      })
      return new Response("Invalid payload structure", { status: 400 })
    }
    const transactions = payload.apply.map((tx) => tx.transactions).flat()

    const processedValues = processRouteTransactions<TFtStxBuyPayload>({
      transactions,
    })

    if (processedValues.length === 0) {
      await sendRealtimeNotification({
        id,
        status: "error",
        title: "Fulfilling Listing",
        message: "No valid listing transactions found",
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
      id,
      status: "success",
      title: "Purchase Successful",
      message: "Token purchase completed successfully",
      tag: "apts",
    })

    return new Response("Token Buy successful", { status: 200 })
  } catch (error) {
    console.error("Error in fulfill-listing-stx:", error)
    await sendRealtimeNotification({
      id,
      status: "error",
      title: "Fulfilling Listing",
      message: "Internal server error",
    })
    return new Response("Internal server error", { status: 500 })
  }
}
