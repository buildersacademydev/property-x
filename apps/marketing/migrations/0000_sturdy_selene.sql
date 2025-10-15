CREATE TABLE "waitlist" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"wallet_address" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"notified" boolean DEFAULT false NOT NULL,
	CONSTRAINT "waitlist_email_unique" UNIQUE("email")
);
