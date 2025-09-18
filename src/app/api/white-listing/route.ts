import util from "util"
import { StacksPayload } from "@hirosystems/chainhook-client"

export async function POST(request: Request) {
  const payload: StacksPayload = await request.json()
  console.log("Received payload in white listing:", payload)
  const transactions = payload.apply.map((tx) => tx.transactions).flat()

  const receipts = transactions
    .map((tx) => tx.metadata.receipt)
    .filter((receipt) =>
      receipt.events.some((event) => event.type === "SmartContractEvent")
    )

  // console.log('receipts with SmartContractEvent', receipts)

  console.log(
    "transactions",
    util.inspect(transactions, { depth: null, colors: true })
  )

  return new Response("White listing successful", { status: 200 })
}
