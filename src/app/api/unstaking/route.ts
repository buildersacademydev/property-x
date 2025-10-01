import { applyUnstakeEvent } from "@/db/actions/staking"
import { TUnstakePayload } from "@/services/type"
import { StacksPayload } from "@hirosystems/chainhook-client"
import { revalidateTag } from "next/cache"
import {
  createTypeGuard,
  debugConsole,
  processRouteTransactions,
} from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const payload: StacksPayload = await request.json()
    if (!payload.apply || !Array.isArray(payload.apply)) {
      return new Response("Invalid payload structure", { status: 400 })
    }
    const transactions = payload.apply.map((tx) => tx.transactions).flat()
    const processedValues = processRouteTransactions<TUnstakePayload>({
      transactions,
    })
    console.log("Processed unstaking values:", debugConsole(processedValues))

    if (!processedValues.length) {
      console.warn("No unstaking events found in transactions")
      return new Response("No unstaking transactions found", { status: 400 })
    }

    const isValidUnstakingObject = createTypeGuard<TUnstakePayload>({
      amount: { type: "number" },
      "stacking-contract": { type: "string" },
      unstaker: { type: "string" },
    })

    const validUnstakingEvents = processedValues.filter(isValidUnstakingObject)

    if (!validUnstakingEvents.length) {
      console.warn(
        "No valid unstaking events after normalization:",
        debugConsole(validUnstakingEvents)
      )
      return new Response("No valid unstaking transactions found", {
        status: 400,
      })
    }

    for (const event of validUnstakingEvents) {
      try {
        const result = await applyUnstakeEvent({
          contract: event["stacking-contract"],
          amount: event.amount,
        })

        console.log(
          `Applied unstaking event for ${event["stacking-contract"]} by ${Array.from(event.unstaker).join(",")}:`,
          debugConsole(result)
        )
      } catch (error) {
        console.error(
          `Failed to persist unstaking event for ${event["stacking-contract"]}:`,
          error
        )
      }
    }

    revalidateTag("apts")
    revalidateTag("ft-balances")

    return new Response("Unstaking apt successful", { status: 200 })
  } catch (error) {
    console.error("Unhandled unstaking route error", error)
    return new Response("Internal server error", { status: 500 })
  }
}
