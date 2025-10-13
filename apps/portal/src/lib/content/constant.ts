import { env } from "../config/env"

export const FUNCTIONCONTRACTMAP = {
  "list-asset-ft": env.MARKETPLACE,
  "set-whitelisted": env.MARKETPLACE,
  "update-protocol-contract": env.MARKETPLACE,
  "update-listing-ft": env.MARKETPLACE,
  "set-emergency-stop": env.MARKETPLACE,
  "set-contract-owner": env.MARKETPLACE,
  "set-transaction-fee-bps": env.MARKETPLACE,
  "cancel-listing-ft": env.MARKETPLACE,

  "fulfil-listing-ft-stx": env.FULFILL,
  "fulfil-ft-listing-ft": env.FULFILL,

  "update-contract": env.ADMIN,

  staking: env.STAKE,
  unstaking: env.STAKE,
} as const

export const WEBHOOK_ROUTES = [
  "cancel-listing",
  "fulfill-listing-stx",
  "listing",
  "staking",
  "unstaking",
  "update-listing",
  "white-listing",
] as const

export type TWebhookRoutes = (typeof WEBHOOK_ROUTES)[number]
