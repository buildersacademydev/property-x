import { mutationOptions } from "@tanstack/react-query"

import { ContractService } from "./api"
import { TListSaleBlockHeight, TWhitelistContractSchema } from "./type"

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
