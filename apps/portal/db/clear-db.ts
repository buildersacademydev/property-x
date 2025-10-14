import { sql } from "drizzle-orm"
import { drizzle } from "drizzle-orm/neon-http"
import { env } from "@/lib/config/env"

async function clearAllTables() {
    try {
        const db = drizzle({
            connection: env.DATABASE_URL,
        })

        console.log("🔄 Clearing all tables...")

        const result = await db.execute(sql`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public'
      AND tablename NOT LIKE 'pg_%'
      AND tablename NOT LIKE 'sql_%'
    `)

        const tables = result.rows || []

        if (tables.length === 0) {
            console.log("ℹ️  No tables found to clear")
            return
        }

        for (const table of tables) {
            const tableName = (table as { tablename: string }).tablename
            console.log(`📊 Truncating ${tableName}...`)
            await db.execute(
                sql`TRUNCATE TABLE ${sql.identifier(tableName)} RESTART IDENTITY CASCADE`
            )
        }

        console.log("✅ All tables cleared successfully!")
        process.exit(0)
    } catch (error) {
        console.error("❌ Error clearing tables:", error)
        process.exit(1)
    }
}

clearAllTables()
