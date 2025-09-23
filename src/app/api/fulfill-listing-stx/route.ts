import { StacksPayload } from "@hirosystems/chainhook-client"
import { debugConsole, processRouteTransactions } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const payload: StacksPayload = await request.json()
    if (!payload.apply || !Array.isArray(payload.apply)) {
      return new Response("Invalid payload structure", { status: 400 })
    }
    const transactions = payload.apply.map((tx) => tx.transactions).flat()
    console.log("transactions in stx buy: ", debugConsole(transactions))
    const processedValues = processRouteTransactions<void>({
      transactions,
    })
    console.log("Processed Values in stx buy: ", processedValues)
    if (processedValues.length === 0) {
      return new Response("No valid listing transactions found", {
        status: 400,
      })
    }

    return new Response("Token Buy successful", { status: 200 })
  } catch (error) {
    console.error("Error processing token buy:", error)
    return new Response("Internal server error", { status: 500 })
  }
}
