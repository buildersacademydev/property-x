"use client"

import React from "react"

import { useTokenListings } from "../hooks/use-token-listings"

const YourListings = () => {
  const { isLoading, isSucess, data } = useTokenListings({
    variant: "userListings",
  })
  console.log("data from listings", data)
  return <div>YourListings</div>
}

export default YourListings
