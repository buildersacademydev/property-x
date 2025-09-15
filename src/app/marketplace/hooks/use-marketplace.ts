import { useWallet } from "@/providers/wallet-provider"
import {
  getBlockHeight,
  getFtBalances,
  getFtListing,
  getFtNonce,
  getTokenMetadata,
} from "@/services/query-options"
import { useQueries, useQuery } from "@tanstack/react-query"
import { range } from "@/lib/utils"

import { getProcessedListing } from "../helper"

export function useMarketplace() {
  const { connected, stxAddress } = useWallet()
  console.log("stxAddress", stxAddress)
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

  // const filterownedNfts = useQueries({
  //     queries: ftBalances?.results.map((ft) => {
  //         const ftContract = ft.token.split('::')[0];
  //         const [ftContractAddress, ftContractName] = ftContract.split('.');

  //         return [
  //             {}
  //         ]
  //     }) || [],
  // })

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
    connected,
  }
}
