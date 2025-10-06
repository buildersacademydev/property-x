import { db } from "@/db/drizzle"
import { listings } from "@/db/schema"
import { TListingSchema } from "@/services/type"
import { StacksPayload } from "@hirosystems/chainhook-client"
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
      title: "Listing Apt For Sale",
      message: "Processing listing...",
    })

    const payload: StacksPayload = await request.json()
    const isSuccess = payload.apply.every((tx) =>
      tx.transactions.every((t) => t.metadata.success)
    )

    if (!isSuccess) {
      await sendRealtimeNotification({
        id,
        status: "error",
        title: "Listing Apt For Sale",
        message: "Contract execution failed for one or more transactions",
      })
      return new Response("One or more transactions failed", { status: 400 })
    }

    if (!payload.apply || !Array.isArray(payload.apply)) {
      await sendRealtimeNotification({
        id,
        status: "error",
        title: "Listing Apt For Sale",
        message: "Invalid payload structure",
      })
      return new Response("Invalid payload structure", { status: 400 })
    }

    const transactions = payload.apply.map((tx) => tx.transactions).flat()
    const processedValues = processRouteTransactions<TListingSchema>({
      transactions,
    })
    if (processedValues.length === 0) {
      await sendRealtimeNotification({
        id,
        status: "error",
        title: "Listing Apt For Sale",
        message: "No valid listing transactions found",
      })
      return new Response("No valid listing transactions found", {
        status: 400,
      })
    }

    await db.insert(listings).values(
      processedValues
        .filter((v) => v["asset-contract"])
        .map((values) => ({
          amount: convertAmount(values.amount),
          assetContract: values["asset-contract"],
          expiry: values.expiry,
          listingId: values["listing-id"],
          maker: values.maker,
          paymentAssetContract: values["payment-asset-contract"],
          price: values.price,
          taker: values.taker,
          topic: values.topic,
        }))
    )

    await sendRealtimeNotification({
      id,
      status: "success",
      title: "Listed Apt For Sale",
      message: "Apt listed for sale successfully",
      tag: "apts",
    })
    return new Response("Listing successful", { status: 200 })
  } catch (error) {
    await sendRealtimeNotification({
      id,
      status: "error",
      title: "Listing Apt For Sale",
      message: "Internal server error",
    })
    console.error("Error processing listing:", error)
    return new Response("Internal server error", { status: 500 })
  }
}
