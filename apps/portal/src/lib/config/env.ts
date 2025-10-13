import { z } from "zod"

const serverSchema = z.object({
  DATABASE_URL: z
    .string()
    .url("DATABASE_URL must be a valid URL")
    .includes("postgresql", {
      message: "DATABASE_URL must be a PostgreSQL connection string",
    }),

  NODE_ENV: z.enum(["development", "production", "test"]),

  UPSTASH_REDIS: z
    .string()
    .url("UPSTASH_REDIS must be a valid URL")
    .includes("upstash.io", {
      message: "UPSTASH_REDIS must be an Upstash Redis endpoint",
    }),

  UPSTASH_REDIS_TOKEN: z
    .string()
    .min(10, "UPSTASH_REDIS_TOKEN must be a non-empty token"),
})

const clientSchema = z.object({
  CONTRACT_ADDRESS: z.string().min(30).max(42),
  NETWORK: z.enum(["devnet", "testnet", "mainnet"]),
  MARKETPLACE: z.string().min(1).max(100),
  FULFILL: z.string().min(1).max(100),
  ADMIN: z.string().min(1).max(100),
  STAKE: z.string().min(1).max(100),
})

const validateServerEnv = () => {
  const serverEnv = {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    UPSTASH_REDIS: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  }

  const result = serverSchema.safeParse(serverEnv)

  if (!result.success) {
    console.error("❌ Invalid server environment variables:")
    result.error.issues.forEach((issue) => {
      console.error(`  - ${issue.path.join(".")}: ${issue.message}`)
    })
    throw new Error("Invalid server environment variables")
  }

  return result.data
}

const validateClientEnv = () => {
  const clientEnv = {
    CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    NETWORK: process.env.NEXT_PUBLIC_NETWORK,
    MARKETPLACE: process.env.NEXT_PUBLIC_MARKETPLACE,
    FULFILL: process.env.NEXT_PUBLIC_FULFILL,
    ADMIN: process.env.NEXT_PUBLIC_ADMIN,
    STAKE: process.env.NEXT_PUBLIC_STAKE,
  }

  const result = clientSchema.safeParse(clientEnv)

  if (!result.success) {
    console.error("❌ Invalid client environment variables:")
    result.error.issues.forEach((issue) => {
      console.error(`  - ${issue.path.join(".")}: ${issue.message}`)
      console.error(
        `  - Current value:`,
        clientEnv[issue.path[0] as keyof typeof clientEnv]
      )
    })
    throw new Error("Invalid client environment variables")
  }

  return result.data
}

export const env = {
  ...(typeof window === "undefined" ? validateServerEnv() : {}),
  ...validateClientEnv(),
} as z.infer<typeof serverSchema> & z.infer<typeof clientSchema>

export type Env = typeof env
