import { mutationOptions } from "@tanstack/react-query"

import { ApiService, ContractService } from "./api"
import {
  TFtBalancesResponse,
  TListSaleBlockHeight,
  TWhitelistContractSchema,
} from "./type"

export const postBalancesWhitelist = () => {
  return mutationOptions({
    mutationKey: ["post-balances-whitelist"],
    mutationFn: async ({
      balances,
    }: {
      balances: TFtBalancesResponse["results"]
    }) => ApiService.postBalancesWhitelist({ balances }),
  })
}

export const whitelistContract = () => {
  return mutationOptions({
    mutationKey: ["whitelist-contract"],
    mutationFn: async (values: TWhitelistContractSchema) =>
      ContractService.whitelistContract({ ...values }),
  })
}

export const listAptForSale = () => {
  return mutationOptions({
    mutationKey: ["list-apt-for-sale"],
    mutationFn: async (values: TListSaleBlockHeight) =>
      ContractService.listAptForSale({ ...values }),
  })
}
