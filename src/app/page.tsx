"use client"

import { useWallet } from "@/providers/wallet-provider"
import React from "react"
import { Button } from "@/components/ui/button"

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
    </section>
  )
}

export default Page
