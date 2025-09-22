import { STACKS_DEVNET, STACKS_MAINNET, STACKS_TESTNET } from "@stacks/network"
import { queryOptions } from "@tanstack/react-query"

import { ApiService } from "./api"

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ""
const NETWORK_ENV = process.env.NEXT_PUBLIC_NETWORK
const NETWORK =
  NETWORK_ENV === "testnet"
    ? STACKS_TESTNET
    : NETWORK_ENV === "mainnet"
      ? STACKS_MAINNET
      : STACKS_DEVNET

export const getAccountAssets = (stxAddress: string) => {
  return queryOptions({
    queryKey: ["account-assets", stxAddress],
    queryFn: () => ApiService.getAccountAssets(stxAddress),
  })
}

export const getFtBalances = (stxAddress: string) => {
  return queryOptions({
    queryKey: ["ft-balances", stxAddress],
    queryFn: () => ApiService.getFtBalances(stxAddress),
  })
}
