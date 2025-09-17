import util from "util"
import { StacksPayload } from "@hirosystems/chainhook-client"

export async function POST(request: Request) {
  const payload: StacksPayload = await request.json()
  console.log("Received payload:", payload)
  console.log(
    util.inspect(payload, { showHidden: false, depth: null, colors: true })
  )

  const { apply, rollback } = payload

  if (apply.length > 0) {
    const { transactions } = apply[0]

    for (const transaction of transactions) {
      const { transaction_identifier, metadata } = transaction
      const { success, receipt } = metadata

      const { events } = receipt

      const filteredEvent = events.find((event) => {
        return event.type === "SmartContractEvent"
      })

      const {
        action,
        sender: txSender,
        time,
      } = (
        filteredEvent!.data as {
          contract_identifier: string
          raw_value: string
          topic: string
          value: { action: string; sender: string; time: number }
        }
      ).value

      const extracted = {
        transaction: transaction_identifier.hash,
        event: action,
        status: success === true ? "success" : "failed",
        time: time,
        sender: txSender,
      }

      console.log("extracted data: ", extracted)

      return extracted
    }
  }

  // check if event is rolled back
  if (rollback.length > 0) {
    const { timestamp, transactions, metadata } = rollback[0]

    for (const transaction of transactions) {
      const { transaction_identifier, metadata } = transaction

      return Response.json("")
    }
  }
}
