import { db } from "@/db/drizzle"
import { listings } from "@/db/schema"
import { TListingSchema } from "@/services/type"
import { convertAmount, webhookHandler } from "@/lib/utils"

export async function POST(request: Request) {
  return webhookHandler<TListingSchema>({
    request,
    route: "listing",
    dbOperation: async (processedValues) => {
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
    },
  })
}
