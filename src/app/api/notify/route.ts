import { realtime } from "@/lib/realtime"

export const POST = async () => {
  // 👇 100% type-safe
  await realtime.notification.alert.emit("Hello world")
  return new Response("OK")
}
