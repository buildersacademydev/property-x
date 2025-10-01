CREATE TABLE IF NOT EXISTS "staking_positions" (
    "contract" text PRIMARY KEY,
    "staker" text NOT NULL,
    "amount" bigint NOT NULL,
    "block_time" integer,
    "last_unstaker" text,
    "last_unstake_amount" bigint,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "staking_positions"
    ADD CONSTRAINT "staking_positions_contract_whitelisting_whitelisted_fk"
    FOREIGN KEY ("contract") REFERENCES "whitelisting" ("whitelisted")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
