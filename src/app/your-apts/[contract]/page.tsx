"use client"

import React from "react"
import { useParams } from "next/navigation"

import { useAptData } from "../use-apt-data"

const Page = () => {
  const params = useParams<{ contract: string }>()
  const { items, isLoading } = useAptData()

  if (isLoading) {
    return <div>Loading...</div>
  }
  const contractToList = items.map((item) =>
    item.contract === params.contract ? item : null
  )

  return <div>{contractToList && <>{contractToList}</>}</div>
}

export default Page
