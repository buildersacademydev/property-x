import { applyStakeEvent } from "@/db/actions/staking"
import { TStakePayload } from "@/services/type"
import { StacksPayload } from "@hirosystems/chainhook-client"
import { revalidateTag } from "next/cache"
import {
  createTypeGuard,
  debugConsole,
  processRouteTransactions,
  sendRealtimeNotification,
} from "@/lib/utils"

export async function POST(request: Request) {
  const id = crypto.randomUUID()
  try {
    await sendRealtimeNotification({
      id,
      status: "pending",
      title: "Staking Apt",
      message: "Processing staking...",
    })

    const payload: StacksPayload = await request.json()
    if (!payload.apply || !Array.isArray(payload.apply)) {
      await sendRealtimeNotification({
        id,
        status: "error",
        title: "Staking Apt",
        message: "Invalid payload structure",
      })
      return new Response("Invalid payload structure", { status: 400 })
    }
    const transactions = payload.apply.map((tx) => tx.transactions).flat()
    const processedValues = processRouteTransactions<TStakePayload>({
      transactions,
    })

    console.log("Processed staking values:", debugConsole(processedValues))

    if (!processedValues.length) {
      console.warn("No staking events found in transactions")
      await sendRealtimeNotification({
        id,
        status: "error",
        title: "Staking Apt",
        message: "No staking transactions found",
      })
      return new Response("No staking transactions found", { status: 400 })
    }

    const isValidStackingObject = createTypeGuard<TStakePayload>({
      amount: { type: "number" },
      "block-time": { type: "number" },
      "stacking-contract": { type: "string" },
      staker: { type: "string" },
    })

    const validStakingEvents = processedValues.filter(isValidStackingObject)

    if (!validStakingEvents.length) {
      console.warn(
        "No valid staking events found:",
        debugConsole(processedValues)
      )
      await sendRealtimeNotification({
        id,
        status: "error",
        title: "Staking Apt",
        message: "No valid staking transactions found",
      })
      return new Response("No valid staking transactions found", {
        status: 400,
      })
    }

    for (const event of validStakingEvents) {
      try {
        const result = await applyStakeEvent(event)
        console.log(`Applied staking event for ${event["stacking-contract"]}:`)
      } catch (error) {
        console.error(
          `Failed to persist staking event for ${event["stacking-contract"]}:`,
          error
        )
      }
    }

    revalidateTag("apts")
    revalidateTag("ft-balances")

    await sendRealtimeNotification({
      id,
      status: "success",
      title: "Staked Successfully",
      message: "Apt staked successfully",
      tag: "apts",
    })

    return new Response("Staking apt successful", { status: 200 })
  } catch (error) {
    console.error("Unhandled staking route error", error)
    await sendRealtimeNotification({
      id,
      status: "error",
      title: "Staking Apt",
      message: "Internal server error",
    })
    return new Response("Internal server error", { status: 500 })
  }
}
