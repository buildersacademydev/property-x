import { integer, pgTable, text } from "drizzle-orm/pg-core"

export const listings = pgTable("listings", {
  amount: integer("amount").notNull(),
  assetContract: text("asset_contract").notNull(),
  expiry: integer("expiry").notNull(),
  listingId: integer("listing_id").primaryKey(),
  maker: text("maker").notNull(),
  paymentAssetContract: text("payment_asset_contract"),
  price: integer("price").notNull(),
  taker: text("taker"),
  topic: text("topic").notNull(),
})
