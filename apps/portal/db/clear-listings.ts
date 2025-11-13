import { sql } from "drizzle-orm"
import { db } from "./drizzle"
import { listings } from "./schema"

async function clearListingsTable() {
    try {
        console.log("🔄 Clearing listings table...")

        await db.delete(listings)

        await db.execute(
            sql`ALTER SEQUENCE listings_listing_id_seq RESTART WITH 1`
        )

        console.log("✅ Listings table cleared successfully!")
    } catch (error) {
        console.error("❌ Error clearing listings table:", error)
        throw error
    }
}

clearListingsTable()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))