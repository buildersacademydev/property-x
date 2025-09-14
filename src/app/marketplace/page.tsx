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
  })
  const { data: ftNonceData, isLoading: ftNonceLoading } = useQuery({
    ...getFtNonce(stxAddress || ""),
  })

  const ftListingsQueries = useQueries({
    queries: range(ftNonceData?.value || 0).map((key) => ({
      ...getFtListing(key),
    })),
  })

  if (!connected) return <div>Please connect your wallet</div>

  if (isLoading || ftNonceLoading) return <div>Loading...</div>

  return (
    <div>
      <div>{data ? data.server_version : "No Data"}</div>
      <p>stx address: {stxAddress}</p>
      <p>FT Nonce: {ftNonceData ? ftNonceData.value : "No Data"}</p>
      <div>
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
      </div>
    </div>
  )
}

export default Page
