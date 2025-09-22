import { z } from "zod"

const envSchema = z.object({
  CONTRACT_ADDRESS: z
    .string()
    .length(41, "Contract address must be exactly 41 characters"),

  NETWORK: z.enum(["devnet", "testnet", "mainnet"]),

  DATABASE_URL: z
    .string()
    .url("DATABASE_URL must be a valid URL")
    .includes("postgresql", {
      message: "DATABASE_URL must be a PostgreSQL connection string",
    }),
})

const _env = {
  CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  NETWORK: process.env.NEXT_PUBLIC_NETWORK,
  DATABASE_URL: process.env.DATABASE_URL,
}

const parsedEnv = envSchema.safeParse(_env)

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsedEnv.error.flatten().fieldErrors
  )
  throw new Error("Invalid environment variables")
}

export const env = parsedEnv.data
