import { InferRealtimeEvents, Realtime } from "@upstash/realtime"
import z from "zod"
import { redis } from "./redis"

const schema = {
    notification: z
        .object({
            data: z.object({
                status: z.enum(["success", "error", "pending"]),
                title: z.string(),
                message: z.string(),
                id: z.string(),
                tag: z
                    .array(z.enum(["apts", "listings"]))
                    .or(z.enum(["apts", "listings"]))
                    .optional(),
            }),
        })
        .refine(
            (data) => {
                if (data.data.status === "success") {
                    return data.data.tag !== undefined
                }
                return true
            },
            {
                message: "tag is required when status is 'success'",
                path: ["data", "tag"],
            }
        ),
}

export const realtime = new Realtime({ schema, redis })
export type RealtimeEvents = InferRealtimeEvents<typeof realtime>
export type RealtimeNotification = z.infer<typeof schema.notification>
