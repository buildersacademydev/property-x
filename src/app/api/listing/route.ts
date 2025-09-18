import util from "util"
import { db } from "@/db/drizzle"
import { listings } from "@/db/schema"
import { TListingSchema } from "@/services/type"
import { StacksPayload } from "@hirosystems/chainhook-client"

export async function POST(request: Request) {
  const payload: StacksPayload = await request.json()
  const transactions = payload.apply.map((tx) => tx.transactions).flat()
  transactions.forEach((tx) => {
    const events = tx.metadata.receipt.events
    events.forEach(async (event) => {
      if (event.type === "SmartContractEvent") {
        const eventData = event.data as {
          contract_identifier: string
          raw_value: string
          topic: string
          value: TListingSchema
        }
        const values = eventData.value
        await db.insert(listings).values({
          amount: values.amount,
          assetContract: values["asset-contract"],
          expiry: values.expiry,
          listingId: values["listing-id"],
          maker: values.maker,
          paymentAssetContract: values["payment-asset-contract"],
          price: values.price,
          taker: values.taker,
          topic: eventData.topic,
        })
      }
    })
  })

  return new Response("Listing successful", { status: 200 })
}
