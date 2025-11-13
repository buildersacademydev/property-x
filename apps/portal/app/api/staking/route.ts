import { TStakePayload } from "@/services/type"
import { applyStakeEvent } from "@/db/actions/staking"
import { webhookHandler } from "@/lib/realtime/realtime-handler"

export async function POST(request: Request) {
    return webhookHandler<TStakePayload>({
        request,
        route: "staking",
        dbOperation: async (processedValues) => {
            const ops = processedValues.map((event) => applyStakeEvent(event))
            await Promise.all(ops)
        },
    })
}
