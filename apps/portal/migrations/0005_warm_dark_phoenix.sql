ALTER TABLE "staking_positions" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "staking_positions" ALTER COLUMN "updated_at" SET DEFAULT now();