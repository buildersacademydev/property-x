import { StacksPayload } from "@hirosystems/chainhook-client"
import { TWebhookRoutes } from "../content/constant"
import { TOAST_MESSAGES } from "../content/toast-messages"
import { realtime, RealtimeNotification } from "./realtime"
import { API_MESSAGES } from "../content/api-responses"
import { debugConsole, processRouteTransactions } from "../utils"
import { getWalletAddress } from "@/db/actions/wallet"

export const sendRealtimeNotification = async (
    payload: RealtimeNotification
) => {
    const wallet = await getWalletAddress()
    console.log('wallet in sendRealtimeNotification', wallet)
    const channel = realtime.channel(wallet || 'default')
    console.log('channel in sendRealtimeNotification', channel)
    await channel.emit('notification', payload)
}

export async function webhookHandler<T>({
    request,
    route,
    dbOperation,
}: {
    request: Request
    route: TWebhookRoutes
    dbOperation: (values: T[]) => Promise<void>
}) {
    const id = crypto.randomUUID()
    const title = TOAST_MESSAGES.webhook[route].title
    try {
        await sendRealtimeNotification({
            data: {
                id,
                status: "pending",
                title,
                message: TOAST_MESSAGES.webhook[route].pending.message,
            }
        })
        const payload: StacksPayload = await request.json()
        const isSuccess = payload.apply.every((tx) =>
            tx.transactions.every((t) => t.metadata.success)
        )

        if (!isSuccess) {
            await sendRealtimeNotification({
                data: {
                    id,
                    status: "error",
                    title,
                    message: API_MESSAGES.CONTRACT_FAILED,
                }
            })
            return new Response(API_MESSAGES.CONTRACT_FAILED, { status: 400 })
        }

        if (!payload.apply || !Array.isArray(payload.apply)) {
            await sendRealtimeNotification({
                data: {
                    id,
                    status: "error",
                    title,
                    message: API_MESSAGES.INVALID_PAYLOAD,
                }
            })
            return new Response(API_MESSAGES.INVALID_PAYLOAD, { status: 400 })
        }

        const transactions = payload.apply.map((tx) => tx.transactions).flat()
        const processedValues = processRouteTransactions<T>({
            transactions,
        })
        console.log(`Processed Values: ${title}`, debugConsole(processedValues))
        const validValues = processedValues.filter(
            (v) =>
                v &&
                typeof v === "object" &&
                !Array.isArray(v) &&
                Object.keys(v).length > 0 &&
                ("event-type" in v ? false : true)
        )
        console.log(`Valid Values: ${title}`, debugConsole(validValues))

        if (validValues.length === 0) {
            await sendRealtimeNotification({
                data: {
                    id,
                    status: "error",
                    title,
                    message: API_MESSAGES.NO_VALID_LISTINGS,
                }
            })
            return new Response(API_MESSAGES.NO_VALID_LISTINGS, {
                status: 400,
            })
        }

        await dbOperation(validValues)

        await sendRealtimeNotification({
            data: {
                id,
                status: "success",
                title,
                message: TOAST_MESSAGES.webhook[route].success.message,
                tag: TOAST_MESSAGES.webhook[route].success.tag,
            }
        })

        return new Response(TOAST_MESSAGES.webhook[route].success.message, {
            status: 200,
        })
    } catch (error) {
        await sendRealtimeNotification({
            data: {
                id,
                status: "error",
                title,
                message: API_MESSAGES.INTERNAL_SERVER_ERROR,
            }
        })
        console.error(title, error)
        return new Response(API_MESSAGES.INTERNAL_SERVER_ERROR, { status: 500 })
    }
}