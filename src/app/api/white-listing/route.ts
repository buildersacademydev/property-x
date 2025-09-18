import { db } from "@/db/drizzle"
import { whiteListing } from "@/db/schema"
import { TWhiteListSchema } from "@/services/type"
import { StacksPayload } from "@hirosystems/chainhook-client"
import { eq, inArray, sql } from "drizzle-orm"
import { processRouteTransactions } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const payload: StacksPayload = await request.json()
    const transactions = payload.apply.map((tx) => tx.transactions).flat()
    const processedValues = processRouteTransactions<TWhiteListSchema>({
      transactions,
    })

    const validValues = processedValues.filter((v) => v !== null)

    if (validValues.length === 0) {
      return new Response("No valid transactions to process", { status: 200 })
    }

    const whitelistedAddresses = validValues.map((v) => v.whitelisted)
    const existingRecords = await db
      .select()
      .from(whiteListing)
      .where(inArray(whiteListing.whitelisted, whitelistedAddresses))

    const existingMap = new Map(
      existingRecords.map((record) => [record.whitelisted, record])
    )

    const toDelete = []
    const toInsert = []

    for (const value of validValues) {
      const existing = existingMap.get(value.whitelisted)

      if (!existing && !value.isWhitelisted) {
        continue
      }

      if (existing && existing.isWhitelisted && !value.isWhitelisted) {
        toDelete.push(value.whitelisted)
      } else if (value.isWhitelisted) {
        toInsert.push({
          whitelisted: value.whitelisted,
          isWhitelisted: value.isWhitelisted,
        })
      }
    }

    if (toDelete.length > 0) {
      await db
        .delete(whiteListing)
        .where(inArray(whiteListing.whitelisted, toDelete))
    }

    if (toInsert.length > 0) {
      await db
        .insert(whiteListing)
        .values(toInsert)
        .onConflictDoUpdate({
          target: [whiteListing.whitelisted],
          set: { isWhitelisted: sql`excluded.isWhitelisted` },
        })
    }

    return new Response("Listing successful", { status: 200 })
  } catch (error) {
    console.error("Error processing whitelist:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
