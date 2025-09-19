"use client"

import React from "react"

import { useAptData } from "../use-apt-data"

const Page = () => {
  const { items, isLoading } = useAptData()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {items.map((item) => (
        <div key={item.tokenName}>{item.contract}</div>
      ))}
    </div>
  )
}

export default Page
