import util from "util"
import { StacksPayload } from "@hirosystems/chainhook-client"

export async function POST(request: Request) {
  const payload: StacksPayload = await request.json()
  const transactions = payload.apply.map((tx) => tx.transactions).flat()

  console.log(
    "transactions",
    util.inspect(transactions, { depth: null, colors: true })
  )

  return new Response("White listing successful", { status: 200 })
}
