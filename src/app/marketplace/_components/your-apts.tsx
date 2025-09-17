"use client"

import React from "react"

import { useTokenListings } from "../hooks/use-token-listings"

const YourApts = () => {
  const { isLoading, isSucess, data } = useTokenListings({
    variant: "ownedNfts",
  })

  console.log("data from apts", data)
  return <div>YourApts</div>
}

export default YourApts
