import util from "util"
import { StacksPayload } from "@hirosystems/chainhook-client"
import { Cl } from "@stacks/transactions"

import { API_MESSAGES } from "./content/api-responses"
import { TWebhookRoutes } from "./content/constant"
import { TOAST_MESSAGES } from "./content/toast-messages"
import { realtime, RealtimeEvents } from "./realtime/realtime"
import { TTypeSchema, TWhitelistContractSchema } from "@/services/type"

export function range(length: number): number[] {
    return Array.from({ length }, (_, i) => i)
}

export function processRouteTransactions<T>({
    transactions,
}: {
    transactions: StacksPayload["apply"][number]["transactions"]
}) {
    const values: T[] = []

    transactions.forEach((tx) => {
        const events = tx.metadata.receipt.events

        events.forEach((event) => {
            if (event.type === "SmartContractEvent") {
                const eventData = event.data as {
                    contract_identifier: string
                    raw_value: string
                    topic: string
                    value: T
                }
                values.push(eventData.value)
            }
        })
    })

    return values
}

export function safeUint(value: string | number) {
    const num = BigInt(value || 0)
    return Cl.uint(num)
}

export function debugConsole(args: any) {
    return util.inspect(args, { depth: null, colors: true })
}

export function convertAmount(
    amount: number,
    type: "to-u6" | "from-u6" = "from-u6"
): number {
    if (type === "to-u6") {
        return amount * 1_000_000
    }
    return amount / 1_000_000
}

export function getContractNameAddress(
    contract: TWhitelistContractSchema["whitelisted"]
): { contractAddress: string; contractName: string } {
    const [contractAddress, contractName] = contract.split(".")
    return {
        contractAddress: contractAddress || "",
        contractName: contractName || "",
    }
}

export const formatNumber = (val?: number | string) => {
    const n = typeof val === "string" ? Number(val) : val
    return typeof n === "number" && isFinite(n)
        ? new Intl.NumberFormat("en-US").format(n)
        : typeof val === "string"
            ? val
            : "—"
}

export function createTypeGuard<T extends Record<string, any>>(
    schema: TTypeSchema
): (obj: any) => obj is T {
    return (obj: any): obj is T => {
        if (typeof obj !== "object" || obj === null) return false

        return Object.entries(schema).every(([key, config]) => {
            if (config.optional && !(key in obj)) return true

            if (!config.optional && !(key in obj)) return false

            const value = obj[key]

            if (config.type === "array") {
                return Array.isArray(value)
            }

            return typeof value === config.type
        })
    }
}

export const sendRealtimeNotification = async (
    data: RealtimeEvents["notification"]["data"]
) => {
    await realtime.notification.data.emit(data)
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
            id,
            status: "pending",
            title,
            message: TOAST_MESSAGES.webhook[route].pending.message,
        })
        const payload: StacksPayload = await request.json()
        const isSuccess = payload.apply.every((tx) =>
            tx.transactions.every((t) => t.metadata.success)
        )

        if (!isSuccess) {
            await sendRealtimeNotification({
                id,
                status: "error",
                title,
                message: API_MESSAGES.CONTRACT_FAILED,
            })
            return new Response(API_MESSAGES.CONTRACT_FAILED, { status: 400 })
        }

        if (!payload.apply || !Array.isArray(payload.apply)) {
            await sendRealtimeNotification({
                id,
                status: "error",
                title,
                message: API_MESSAGES.INVALID_PAYLOAD,
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
                id,
                status: "error",
                title,
                message: API_MESSAGES.NO_VALID_LISTINGS,
            })
            return new Response(API_MESSAGES.NO_VALID_LISTINGS, {
                status: 400,
            })
        }

        await dbOperation(validValues)

        await sendRealtimeNotification({
            id,
            status: "success",
            title,
            message: TOAST_MESSAGES.webhook[route].success.message,
            tag: TOAST_MESSAGES.webhook[route].success.tag,
        })

        return new Response(TOAST_MESSAGES.webhook[route].success.message, {
            status: 200,
        })
    } catch (error) {
        await sendRealtimeNotification({
            id,
            status: "error",
            title,
            message: API_MESSAGES.INTERNAL_SERVER_ERROR,
        })
        console.error(title, error)
        return new Response(API_MESSAGES.INTERNAL_SERVER_ERROR, { status: 500 })
    }
}
