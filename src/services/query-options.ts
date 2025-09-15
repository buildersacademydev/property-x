import {
  ClarityType,
  ClarityValue,
  contractPrincipalCV,
  fetchCallReadOnlyFunction,
  fetchContractMapEntry,
  ResponseOkCV,
  uintCV,
  UIntCV,
} from "@stacks/transactions"
import { queryOptions } from "@tanstack/react-query"

import { ApiService } from "./api"
import { TNetwork } from "./type"

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ""
const NETWORK = process.env.NEXT_PUBLIC_NETWORK || "testnet"

export const getBlockHeight = () => {
  return queryOptions({
    queryKey: ["block-height"],
    queryFn: () => ApiService.getBlockHeight(),
  })
}

export const getFtBalances = (stxAddress: string) => {
  return queryOptions({
    queryKey: ["ft-balances", stxAddress],
    queryFn: () => ApiService.getFtBalances(stxAddress),
  })
}

export const getFtNonce = (stxAddress: string) => {
  return queryOptions({
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
}

export const getFtListing = (key: number) => {
  return queryOptions({
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
}

export const isFtWhitelisted = (
  ftContractAddress: string,
  ftContractName: string,
  stxAddress: string
) => {
  return queryOptions({
    queryKey: ["is-ft-whitelisted", ftContractAddress, ftContractName],
    queryFn: async () =>
      await fetchCallReadOnlyFunction({
        contractAddress: CONTRACT_ADDRESS,
        contractName: "marketplace",
        functionName: "is-whitelisted",
        functionArgs: [contractPrincipalCV(ftContractAddress, ftContractName)],
        senderAddress: stxAddress,
        network: NETWORK as TNetwork,
      }),
    select: (data) => {
      if (data.type === ClarityType.ResponseOk) {
        const inner = (data as ResponseOkCV<ClarityValue>).value
        if (inner.type === ClarityType.BoolTrue) {
          return { value: true }
        } else if (inner.type === ClarityType.BoolFalse) {
          return { value: false }
        }
      }
      return { value: false }
    },
  })
}

export const getTokenMetadata = (
  metadataType: "get-name" | "get-symbol",
  contractName: string,
  stxAddress: string
) => {
  return queryOptions({
    queryKey: ["token-metadata", metadataType, CONTRACT_ADDRESS, contractName],
    queryFn: async () =>
      await fetchCallReadOnlyFunction({
        contractAddress: CONTRACT_ADDRESS,
        contractName,
        functionName: metadataType,
        functionArgs: [],
        senderAddress: stxAddress,
        network: NETWORK as TNetwork,
      }),
    select: (data) => {
      if (data.type === ClarityType.ResponseOk) {
        const inner = (data as ResponseOkCV<ClarityValue>).value
        if (
          inner.type === ClarityType.StringASCII ||
          inner.type === ClarityType.StringUTF8
        ) {
          return { value: inner.value }
        }
      }
      return { value: null }
    },
  })
}

export const getFtImageUrl = (
  ftContractAddress: string,
  ftContractName: string
) => {
  return queryOptions({
    queryKey: ["ft-image-url", ftContractAddress, ftContractName],
    queryFn: async () =>
      await fetchCallReadOnlyFunction({
        contractAddress: ftContractAddress,
        contractName: ftContractName,
        functionName: "get-token-uri",
        functionArgs: [],
        senderAddress: CONTRACT_ADDRESS,
        network: NETWORK as TNetwork,
      }),
    select: async (data) => {
      if (data.type === ClarityType.ResponseOk) {
        const inner = (data as ResponseOkCV<ClarityValue>).value
        if (
          inner.type === ClarityType.StringASCII ||
          inner.type === ClarityType.StringUTF8
        ) {
          const url = inner.value as string
          try {
            const json = await ApiService.fetchJson<any>(url)
            console.log("image json", json)
            const image =
              json?.image || json?.image_url || json?.data?.image || null
            return { value: { url, metadata: json, image } }
          } catch (e) {
            console.error("Get Ft image fetchJson error:", e)
            return { value: { url, metadata: null, image: null } }
          }
        }
      }
      return { value: null }
    },
  })
}
