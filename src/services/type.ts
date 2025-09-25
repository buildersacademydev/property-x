import { z } from "zod"
import { functionContractMap } from "@/lib/utils"

import {
  buyListingSchema,
  listForSaleSchema,
  marketplaceSchema,
  whitelistContractSchema,
} from "./schema"

export interface TBlockHeightResponse {
  server_version: string
  status: string
  pox_v1_unlock_height: number
  pox_v2_unlock_height: number
  pox_v3_unlock_height: number
  chain_tip: Chain_tip
}
interface Chain_tip {
  block_height: number
  block_hash: string
  index_block_hash: string
  burn_block_height: number
}
export interface TFtBalancesResponse {
  limit: number
  offset: number
  total: number
  results: ResultsItem[]
}
interface ResultsItem {
  token: `${string}.${string}::${string}`
  balance: string
}

export type TWhiteListedBalances = ResultsItem & {
  name: string
  contractAddress: string
  contractName: string
}

export interface TTestCoin {
  name: string
  description: string
  image: string
  asset: Asset
}
interface Asset {
  name: string
  image: string
  location: string
  valuation: string
  tokens: string
  apr: string
  description: string
  staking: string
}

export interface TListingSchema {
  amount: number
  "asset-contract": string
  expiry: number
  "listing-id": number
  maker: string
  "payment-asset-contract": null | string
  price: number
  taker: null | string
  topic: string
}

export interface TCoinSchema {
  name: string
  description: string
  image: string
  asset: Asset
}
interface Asset {
  name: string
  image: string
  location: string
  valuation: string
  tokens: string
  apr: string
  description: string
  staking: string
}

export interface TMarketplaceListing {
  listingId: number
  amount: number
  expiry: number
  maker: string
  paymentAssetContract: string | null
  price: number
  taker: string | null
  topic: string
  assetContract: string
  contractName: string
  contractDescription: string
  contractImage: string
  assetName: string
  assetImage: string
  assetLocation: string
  assetValuation: string
  assetTokens: string
  assetApr: string
  assetDescription: string
  assetStaking: string
}

export type TFunctionName = keyof typeof functionContractMap

export type TWhitelistContractSchema = z.infer<typeof whitelistContractSchema>
export type TMarketplaceSchema = z.infer<typeof marketplaceSchema>
export type TBuyListingSchema = z.infer<typeof buyListingSchema>
export type TListForSaleSchema = z.infer<typeof listForSaleSchema>

export type TListSaleBlockHeight = TListForSaleSchema & {
  currentBlockHeight: number
  contract: string
}

export type TBuyListing = TBuyListingSchema & {
  listingId: number
  contract: string
}
