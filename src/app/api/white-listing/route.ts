import { db } from "@/db/drizzle"
import { whiteListing } from "@/db/schema"
import { TWhiteListSchema } from "@/services/type"
import { StacksPayload } from "@hirosystems/chainhook-client"
import { processRouteTransactions } from "@/lib/utils"

export async function POST(request: Request) {
  const payload: StacksPayload = await request.json()
  const transactions = payload.apply.map((tx) => tx.transactions).flat()
  const processedValues = processRouteTransactions<TWhiteListSchema>({
    transactions,
  })

  await db
    .insert(whiteListing)
    .values(
      processedValues.map((values) => ({
        whitelisted: values.whitelisted,
        isWhitelisted: values.isWhitelisted,
      }))
    )
    .onConflictDoNothing()

  return new Response("Listing successful", { status: 200 })
}
