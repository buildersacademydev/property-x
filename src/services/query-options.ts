import {
  ClarityType,
  ClarityValue,
  fetchCallReadOnlyFunction,
  fetchContractMapEntry,
  ResponseOkCV,
  uintCV,
  UIntCV,
} from "@stacks/transactions"
import { queryOptions } from "@tanstack/react-query"

import { ApiService } from "./api"
import { TFtNonceResponse, TNetwork } from "./type"

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ""
const NETWORK = process.env.NEXT_PUBLIC_NETWORK || "testnet"

export const getBlockHeight = () =>
  queryOptions({
    queryKey: ["block-height"],
    queryFn: () => ApiService.getBlockHeight(),
  })

export const getFtNonce = (stxAddress: string) =>
  queryOptions({
    queryKey: ["ft-nonce"],
    queryFn: async () =>
      await fetchCallReadOnlyFunction({
        contractName: "marketplace",
        contractAddress: CONTRACT_ADDRESS,
        functionName: "get-listing-ft-nonce",
        functionArgs: [],
        senderAddress: stxAddress,
        network: NETWORK as TNetwork,
      }),
    select: (data) => {
      if (data.type === ClarityType.ResponseOk) {
        const inner = (data as ResponseOkCV<ClarityValue>).value
        if (inner.type === ClarityType.UInt) {
          return { value: parseInt((inner as UIntCV).value.toString()) }
        }
      }
      return { value: null }
    },
  })

export const getFtListing = (key: number) =>
  queryOptions({
    queryKey: ["ft-listing", key],
    queryFn: async () =>
      await fetchContractMapEntry({
        contractAddress: CONTRACT_ADDRESS,
        contractName: "marketplace",
        mapName: "listings-ft",
        mapKey: uintCV(key),
        network: NETWORK as TNetwork,
      }),
  })
