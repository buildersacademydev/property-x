"use client"

import { useWallet } from "@/providers/wallet-provider"
import React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import Marketplace from "./_components/marketplace"
import YourApts from "./_components/your-apts"
import YourListings from "./_components/your-listings"

const Page = () => {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab")
  const { connected } = useWallet()
  const router = useRouter()
  React.useEffect(() => {
    if (!connected) {
      router.push("/")
    }
  }, [connected, router])

  if (!connected) {
    return null
  }

  if (activeTab === "apts") {
    return <YourApts />
  }

  if (activeTab === "listings") {
    return <YourListings />
  }

  return <Marketplace />
}

export default Page
