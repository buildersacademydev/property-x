import {
  getFtImageUrl,
  getImageDetail,
  getTokenMetadata,
} from "@/services/query-options"
import { useQueries } from "@tanstack/react-query"

import { getContractInfo } from "../helper"
import { useMarketplace } from "./use-marketplace"

interface UseTokenListingsProps {
  variant: "marketplace" | "userListings" | "ownedNfts"
}

export function useTokenListings({ variant }: UseTokenListingsProps) {
  const {
    connected,
    isLoading,
    marketplaceData,
    userListingsData,
    ownedNftsData,
    stxAddress,
  } = useMarketplace()

  const dataMap = {
    marketplace: marketplaceData,
    userListings: userListingsData,
    ownedNfts: ownedNftsData,
  } as const

  const listings = dataMap[variant]

  const imageUrlQueries = useQueries({
    queries: listings.map((item) => {
      const { contractAddress, contractName } = getContractInfo(item, variant)

      return {
        ...getFtImageUrl(contractAddress, contractName),
        enabled: connected && !!stxAddress,
      }
    }),
    combine: (results) => {
      return {
        isSuccess: results.every((r) => r.isSuccess),
        isLoading: results.some((r) => r.isLoading),
        data: results.map((r) => r.data || []),
      }
    },
  })

  console.log("imageUrlQueries", imageUrlQueries.data)

  // Build metadata queries with index tracking (robust for any listings length and missing data)
  const nameIndexPerListing: (number | null)[] = []
  const symbolIndexPerListing: (number | null)[] = []
  const tokenMetadataQueryOptions: any[] = []
  let queryCursor = 0
  listings.forEach((item, idx) => {
    const { contractAddress, contractName } = getContractInfo(item, variant)
    if (!contractAddress || !contractName) {
      nameIndexPerListing[idx] = null
      symbolIndexPerListing[idx] = null
      return
    }
    nameIndexPerListing[idx] = queryCursor
    tokenMetadataQueryOptions.push({
      ...getTokenMetadata({
        metadataType: "get-name",
        contractName,
        contractAddress,
        stxAddress: stxAddress || "",
      }),
      enabled: connected && !!stxAddress,
    })
    queryCursor += 1
    symbolIndexPerListing[idx] = queryCursor
    tokenMetadataQueryOptions.push({
      ...getTokenMetadata({
        metadataType: "get-symbol",
        contractName,
        contractAddress,
        stxAddress: stxAddress || "",
      }),
      enabled: connected && !!stxAddress,
    })
    queryCursor += 1
  })

  // Image detail queries with index tracking
  const imageDetailIndexPerListing: (number | null)[] = []
  const imageDetailQueryOptions: any[] = []
  const imageDetailOffset = tokenMetadataQueryOptions.length
  ;(imageUrlQueries.data || []).forEach((d: any, idx: number) => {
    const url = d && (d as any).url ? (d as any).url : null
    if (!url) {
      imageDetailIndexPerListing[idx] = null
      return
    }
    imageDetailIndexPerListing[idx] =
      imageDetailOffset + imageDetailQueryOptions.length
    imageDetailQueryOptions.push({
      ...getImageDetail(url),
      enabled: connected && !!stxAddress,
    })
  })

  const metadataQueries = useQueries({
    queries: [...tokenMetadataQueryOptions, ...imageDetailQueryOptions],
    combine: (results) => {
      const isSuccess = results.every((r) => r.isSuccess)
      const isLoading = results.some((r) => r.isLoading)

      const aggregated = listings.map((_, idx) => {
        const nameRes =
          nameIndexPerListing[idx] != null
            ? results[nameIndexPerListing[idx] as number]
            : undefined
        const symbolRes =
          symbolIndexPerListing[idx] != null
            ? results[symbolIndexPerListing[idx] as number]
            : undefined
        const imageRes =
          imageDetailIndexPerListing[idx] != null
            ? results[imageDetailIndexPerListing[idx] as number]
            : undefined
        const imageUrl =
          (imageRes?.data as any)?.image || (imageRes?.data as any)?.url || null
        return {
          name: (nameRes?.data as any)?.value ?? null,
          symbol: (symbolRes?.data as any)?.value ?? null,
          imageUrl,
        }
      })

      return {
        isSuccess,
        isLoading,
        data: aggregated,
      }
    },
  })

  console.log("metadataQueries", metadataQueries.data)

  return {
    isLoading: metadataQueries.isLoading || imageUrlQueries.isLoading,
    isSucess: metadataQueries.isSuccess && imageUrlQueries.isSuccess,
    data: metadataQueries.data,
  }
}
