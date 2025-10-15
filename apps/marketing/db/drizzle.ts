import { config } from "dotenv"
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http"

config({ path: ".env.local" })

export const db: NeonHttpDatabase = drizzle(process.env.DATABASE_URL_MARKETING!)
