import { queryOptions } from "@tanstack/react-query"

import { ApiService } from "./api"

export const getBlockHeight = () => {
  return queryOptions({
    queryKey: ["block-height"],
    queryFn: () => ApiService.getBlockHeight(),
  })
}

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
