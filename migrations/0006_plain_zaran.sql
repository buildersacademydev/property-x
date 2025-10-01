CREATE TABLE "stake_apt" (
	"contract" text PRIMARY KEY NOT NULL,
	"staker" text NOT NULL,
	"amount" bigint NOT NULL,
	"block_time" integer
);
--> statement-breakpoint
DROP TABLE "staking_positions" CASCADE;--> statement-breakpoint
ALTER TABLE "stake_apt" ADD CONSTRAINT "stake_apt_contract_whitelisting_whitelisted_fk" FOREIGN KEY ("contract") REFERENCES "public"."whitelisting"("whitelisted") ON DELETE no action ON UPDATE no action;