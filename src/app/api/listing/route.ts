import { db } from "@/db/drizzle"
import { listings } from "@/db/schema"
import { TListingSchema } from "@/services/type"
import { StacksPayload } from "@hirosystems/chainhook-client"
import { processRouteTransactions } from "@/lib/utils"

export async function POST(request: Request) {
  const payload: StacksPayload = await request.json()
  const transactions = payload.apply.map((tx) => tx.transactions).flat()
  const processedValues = processRouteTransactions<TListingSchema>({
    transactions,
  })

  await db.insert(listings).values(
    processedValues.map((values) => ({
      amount: values.amount,
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

  return new Response("Listing successful", { status: 200 })
}
