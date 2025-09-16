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

import { getProcessedListing } from "./helper"
import { useMarketplace } from "./hooks/use-marketplace"
import { useTokenListings } from "./hooks/use-token-listings"

const Page = () => {
  const x = useTokenListings({ variant: "marketplace" })
  // const marketplaceListings = ftListingsQueries.data.filter(listing => !listing.isUserListing);

  return (
    <div>
      Marketplace
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
