"use client"

import { useWallet } from "@/providers/wallet-provider"
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NextLink } from "@/components/common/next-link"

const Page = () => {
  const { connected, stxAddress, getConnect, getDisconnect } = useWallet()
  const handleConnect = () => {
    getConnect()
  }

  return (
    <section className="flex flex-col gap-4 p-8">
      <Button onClick={handleConnect}>Connect Wallet</Button>
      <div>Connected: {connected ? "true" : "false"}</div>
      <div>StxAddress: {stxAddress}</div>
      <Button variant={"destructive"} onClick={getDisconnect}>
        disconnect
      </Button>
      <div className="mt-16 bg-background/80 px-6">
        <NextLink href="/marketplace" className="text-blue-500">
          Marketplace
        </NextLink>
      </div>
    </section>
  )
}

export default Page
