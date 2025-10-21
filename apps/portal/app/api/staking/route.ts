import { TStakePayload } from "@/services/type"
import { webhookHandler } from "@/lib/utils"
import { applyStakeEvent } from "@/db/actions/staking"

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
