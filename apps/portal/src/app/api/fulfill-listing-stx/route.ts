import { db } from "@/db/drizzle"
import { listings } from "@/db/schema"
import { TFtStxBuyPayload } from "@/services/type"
import { eq } from "drizzle-orm"
import { convertAmount, webhookHandler } from "@/lib/utils"

export async function POST(request: Request) {
  return webhookHandler<TFtStxBuyPayload>({
    request,
    route: "fulfill-listing-stx",
    dbOperation: async (processedValues) => {
      const ops = processedValues.map((v) => {
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
    },
  })
}
