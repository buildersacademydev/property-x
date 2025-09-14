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
