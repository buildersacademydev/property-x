"use client"

import { useWallet } from "@/providers/wallet-provider"
import {
  getBlockHeight,
  getFtListing,
  getFtNonce,
} from "@/services/query-options"
import { useQueries, useQuery } from "@tanstack/react-query"
import React from "react"
import { range } from "@/lib/utils"

const Page = () => {
  const { connected, stxAddress } = useWallet()
  const { data, isLoading } = useQuery({
    ...getBlockHeight(),
    enabled: connected,
  })
  const currentBlockHeight = data?.chain_tip.block_height
  const { data: ftNonceData, isLoading: ftNonceLoading } = useQuery({
    ...getFtNonce(stxAddress || ""),
    enabled: connected && !!stxAddress,
  })

  const ftListingsQueries = useQueries({
    queries: range(ftNonceData?.value || 0).map((key) => ({
      ...getFtListing(key),
      enabled:
        !!ftNonceData && !!currentBlockHeight && connected && !!stxAddress,
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

        const processedListing = {
          id: i,
          tokenAmount: Number(
            tupleWrapper.amt?.type === "uint" ? tupleWrapper.amt.value : 0
          ),
          maker:
            tupleWrapper.maker?.type === "address"
              ? tupleWrapper.maker.value
              : null,
          taker:
            tupleWrapper.taker?.type === "address"
              ? tupleWrapper.taker.value
              : null,
          ftAssetContract:
            tupleWrapper["ft-asset-contract"]?.type === "contract"
              ? tupleWrapper["ft-asset-contract"].value
              : null,
          expiry,
          price: Number(
            tupleWrapper.price?.type === "uint" ? tupleWrapper.price.value : 0
          ),
          paymentAssetContract:
            tupleWrapper["payment-asset-contract"]?.type === "address"
              ? tupleWrapper["payment-asset-contract"].value
              : null,
          type: "ft",
          isUserListing:
            (tupleWrapper.maker?.type === "address"
              ? tupleWrapper.maker.value
              : null) === stxAddress,
        }

        return [processedListing]
      })

      return {
        data: validListings,
        loading: results.some((r) => r.isLoading),
      }
    },
  })

  if (!connected) return <div>Please connect your wallet</div>

  if (isLoading || ftNonceLoading || ftListingsQueries.loading)
    return <div>Loading...</div>

  return (
    <div>
      <div>{data ? data.server_version : "No Data"}</div>
      <p>stx address: {stxAddress}</p>
      <p>current block height: {currentBlockHeight}</p>

      <p>FT Nonce: {ftNonceData ? ftNonceData.value : "No Data"}</p>
      {/* <div>
                {ftListingsQueries.map((query, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid black",
                            margin: "10px",
                            padding: "10px",
                        }}
                    >
                        <p>Listing {index}:</p>
                        <pre>{query.isSuccess ? query.data.type : "No Data"}</pre>
                    </div>
                ))}
            </div> */}
    </div>
  )
}

export default Page
