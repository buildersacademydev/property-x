import { applyUnstakeEvent } from "@/db/actions/staking"
import { TUnstakePayload } from "@/services/type"
import { webhookHandler } from "@/lib/utils"

export async function POST(request: Request) {
  return webhookHandler<TUnstakePayload>({
    request,
    route: "unstaking",
    dbOperation: async (processedValues) => {
      const ops = processedValues.map((event) =>
        applyUnstakeEvent({
          contract: event["stacking-contract"],
          amount: event.amount,
        })
      )
      await Promise.all(ops)
    },
  })
}
