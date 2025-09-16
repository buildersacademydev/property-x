import { useWallet } from "@/providers/wallet-provider"
import {
  getBlockHeight,
  getFtBalances,
  getFtImageUrl,
  getFtListing,
  getFtNonce,
  getOwnedNfts,
  isFtWhitelisted,
} from "@/services/query-options"
import { TWhiteListedBalances } from "@/services/type"
import { useQueries, useQuery } from "@tanstack/react-query"
import { range } from "@/lib/utils"

import { getProcessedListing } from "../helper"

export function useMarketplace() {
  const { connected, stxAddress } = useWallet()
  const { data: blockHeightData, isSuccess: blockHeightSuccess } = useQuery({
    ...getBlockHeight(),
    enabled: connected,
  })
  const { data: ftNonceData } = useQuery({
    ...getFtNonce(stxAddress || ""),
    enabled: connected && !!stxAddress,
  })

  const currentBlockHeight = blockHeightData?.chain_tip.block_height

  const ftListingsQueries = useQueries({
    queries: range(ftNonceData?.value || 0).map((key) => ({
      ...getFtListing(key),
      enabled:
        !!ftNonceData &&
        !!currentBlockHeight &&
        connected &&
        blockHeightSuccess,
    })),
    combine: (results) => {
      const validListings = results.flatMap((r, i) => {
        if (!r.isSuccess) return []

        const clarityOption = r.data
        const tupleWrapper =
          clarityOption?.type === "some" &&
          clarityOption.value?.type === "tuple"
            ? clarityOption.value.value
            : null
        if (!tupleWrapper) return []

        const expiry =
          tupleWrapper.expiry?.type === "uint"
            ? Number(tupleWrapper.expiry.value)
            : 0
        if (!expiry || !currentBlockHeight || currentBlockHeight >= expiry)
          return []

        const processedListing = getProcessedListing({
          tupleWrapper,
          i,
          stxAddress: stxAddress || "",
          expiry,
        })

        return [processedListing]
      })

      return {
        data: validListings,
        loading: results.some((r) => r.isLoading),
        isSuccess: results.every((r) => r.isSuccess),
      }
    },
  })

  const { data: ftBalances, isSuccess: ftBalancesSuccess } = useQuery({
    ...getFtBalances(stxAddress || ""),
    enabled: connected && !!stxAddress,
  })

  const ftWhiteListedQueries = useQueries({
    queries:
      ftBalancesSuccess && ftBalances
        ? ftBalances.results.map((ftBalance) => ({
            ...isFtWhitelisted({ ftBalance, stxAddress: stxAddress || "" }),
            enabled: connected && !!stxAddress && ftBalancesSuccess,
          }))
        : [],
    combine: (results) => {
      return {
        data: results.filter((r) => r.data !== null),
        isSuccess: results.every((r) => r.isSuccess),
      }
    },
  })

  const ftImageUrls = useQueries({
    queries:
      ftWhiteListedQueries.data?.map((whitelisted) => ({
        ...getFtImageUrl(
          whitelisted.data?.contractAddress || "",
          whitelisted.data?.contractName || "",
          whitelisted.data
        ),
        enabled: connected && ftWhiteListedQueries.isSuccess,
      })) ?? [],
    combine: (results) => {
      return {
        isSuccess: results.every((d) => d.isSuccess),
        data: results.map((d) => d.data),
      }
    },
  })

  const ownedNftsWithImages = useQueries({
    queries:
      ftImageUrls.data?.map((ftImageUrl) => ({
        ...getOwnedNfts(
          ftImageUrl?.url || "",
          ftImageUrl?.whitelistedData as TWhiteListedBalances
        ),
        enabled: connected && ftImageUrls.isSuccess,
      })) ?? [],
    combine: (results) => {
      return {
        isSuccess: results.every((d) => d.isSuccess),
        data: results.map((d) => d.data),
      }
    },
  })

  const filterMarketplace = ftListingsQueries.data.filter(
    (listing) => !listing.isUserListing
  )
  const filterUserListings = ftListingsQueries.data.filter(
    (listing) => listing.isUserListing
  )

  return {
    isLoading: ftListingsQueries.loading,
    marketplaceData: filterMarketplace,
    userListingsData: filterUserListings,
    ownedNftsData: ownedNftsWithImages.data,
    connected,
    stxAddress,
  }
}
