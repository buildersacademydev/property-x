import { db } from "@/db/drizzle"
import { listings } from "@/db/schema"
import { webhookHandler } from "@/lib/realtime/realtime-handler"
import { TCancelListingPayload } from "@/services/type"
import { and, eq } from "drizzle-orm"

export async function POST(request: Request) {
    return webhookHandler<TCancelListingPayload>({
        request,
        route: "cancel-listing",
        dbOperation: async (processedValues) => {
            const dedupedMap = new Map<string, TCancelListingPayload>()
            for (const v of processedValues) {
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
        },
    })
}
