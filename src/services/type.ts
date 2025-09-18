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

export type TNetwork = "testnet" | "mainnet" | "devnet" | "mocknet" | undefined

export interface TFtNonceResponse {
  type: string
  value: Value
}
interface Value {
  type: string
  value: string
}

export interface TFtListing {
  id: number
  tokenAmount: number
  maker: string | null
  taker: string | null
  ftAssetContract: `${string}.${string}` | null
  expiry: number
  price: number
  paymentAssetContract: string | null
  type: string
  isUserListing: boolean
}

export interface TFtBalancesResponse {
  limit: number
  offset: number
  total: number
  results: ResultsItem[]
}
interface ResultsItem {
  token: string
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

// new ones

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
