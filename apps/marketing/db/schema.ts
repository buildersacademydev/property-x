import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core"

export const waitlist = pgTable("waitlist", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    walletAddress: text("wallet_address").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    notified: boolean("notified").default(false).notNull(),
})

export type Waitlist = typeof waitlist.$inferSelect
export type NewWaitlist = typeof waitlist.$inferInsert
