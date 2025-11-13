import { TUnstakePayload } from "@/services/type"
import { applyUnstakeEvent } from "@/db/actions/staking"
import { webhookHandler } from "@/lib/realtime/realtime-handler"

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
