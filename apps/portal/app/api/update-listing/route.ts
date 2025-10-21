import { db } from "@/db/drizzle"
import { listings } from "@/db/schema"
import { TUpdateListingPayload } from "@/services/type"
import { and, eq } from "drizzle-orm"
import { convertAmount, webhookHandler } from "@/lib/utils"

export async function POST(request: Request) {
    return webhookHandler<TUpdateListingPayload>({
        request,
        route: "update-listing",
        dbOperation: async (processedValues) => {
            const dedupedMap = new Map<number, TUpdateListingPayload>()
            for (const v of processedValues) {
                dedupedMap.set(v["listing-id"], v)
            }
            const deduped = Array.from(dedupedMap.values())
            const ops = deduped.map((v) =>
                db
                    .update(listings)
                    .set({
                        amount: convertAmount(v["new-amt"], "from-u6"),
                        expiry: v["new-expiry"],
                        price: v["new-price"],
                    })
                    .where(
                        and(
                            eq(listings.listingId, v["listing-id"]),
                            eq(listings.maker, v.maker)
                        )
                    )
            )
            await Promise.all(ops)
        },
    })
}
