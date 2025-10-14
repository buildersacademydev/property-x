import { Redis } from "@upstash/redis"

import { env } from "../config/env"

export const redis = new Redis({
    url: env.UPSTASH_REDIS,
    token: env.UPSTASH_REDIS_TOKEN,
})
