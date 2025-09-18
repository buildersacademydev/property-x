import { db } from "@/db/drizzle"
import { whiteListing } from "@/db/schema" // Add your token URI table import
import { TWhiteListSchema } from "@/services/type"
import { StacksPayload } from "@hirosystems/chainhook-client"
import { STACKS_DEVNET, STACKS_MAINNET, STACKS_TESTNET } from "@stacks/network"
import { fetchCallReadOnlyFunction } from "@stacks/transactions"
import { inArray } from "drizzle-orm"
import { processRouteTransactions } from "@/lib/utils"

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ""
const NETWORK_ENV = process.env.NEXT_PUBLIC_NETWORK
const NETWORK =
  NETWORK_ENV === "testnet"
    ? STACKS_TESTNET
    : NETWORK_ENV === "mainnet"
      ? STACKS_MAINNET
      : STACKS_DEVNET

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
      } else if (value.isWhitelisted && !existing) {
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
      await db.insert(whiteListing).values(toInsert).onConflictDoNothing()

      for (const item of toInsert) {
        try {
          const contract = item.whitelisted.split(".")

          if (contract.length !== 2) {
            console.warn(`Invalid contract format: ${item.whitelisted}`)
            continue
          }
          console.log("whitelist contract", contract)

          const getTokenUri = await fetchCallReadOnlyFunction({
            contractAddress: contract[0],
            contractName: contract[1],
            functionName: "get-token-uri",
            functionArgs: [],
            senderAddress: CONTRACT_ADDRESS,
            network: NETWORK,
          })

          console.log("network", NETWORK)

          console.log("Whitelist token uri", getTokenUri)
        } catch (error) {
          console.error(
            `Error fetching token URI for ${item.whitelisted}:`,
            error
          )
        }
      }
    }

    return new Response("Listing successful", { status: 200 })
  } catch (error) {
    console.error("Error processing whitelist:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
