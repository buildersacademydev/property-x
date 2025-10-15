CREATE TABLE "assets" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"location" text NOT NULL,
	"valuation" text NOT NULL,
	"tokens" text NOT NULL,
	"apr" text NOT NULL,
	"description" text NOT NULL,
	"staking" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "listings" (
	"listing_id" serial PRIMARY KEY NOT NULL,
	"asset_contract" text NOT NULL,
	"amount" integer NOT NULL,
	"expiry" integer NOT NULL,
	"maker" text NOT NULL,
	"payment_asset_contract" text,
	"price" integer NOT NULL,
	"taker" text,
	"topic" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stake_apt" (
	"contract" text PRIMARY KEY NOT NULL,
	"staker" text NOT NULL,
	"amount" integer NOT NULL,
	"block_time" integer
);
--> statement-breakpoint
CREATE TABLE "tcoins" (
	"contract" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"asset_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "whitelisting" (
	"whitelisted" text PRIMARY KEY NOT NULL,
	"is_whitelisted" boolean NOT NULL
);
--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_asset_contract_whitelisting_whitelisted_fk" FOREIGN KEY ("asset_contract") REFERENCES "public"."whitelisting"("whitelisted") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stake_apt" ADD CONSTRAINT "stake_apt_contract_whitelisting_whitelisted_fk" FOREIGN KEY ("contract") REFERENCES "public"."whitelisting"("whitelisted") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tcoins" ADD CONSTRAINT "tcoins_contract_whitelisting_whitelisted_fk" FOREIGN KEY ("contract") REFERENCES "public"."whitelisting"("whitelisted") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tcoins" ADD CONSTRAINT "tcoins_asset_id_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."assets"("id") ON DELETE no action ON UPDATE no action;