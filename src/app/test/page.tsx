"use client"

import { useWallet } from "@/providers/wallet-provider"
import { getFtBalances } from "@/services/query-options"
import { STACKS_DEVNET } from "@stacks/network"
import { Cl } from "@stacks/transactions"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { Button } from "@/components/ui/button"

import { getRequest } from "./get-request"

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ""
const CONTRACT_NAME = "marketplace"
const FUNCTION_NAME = "list-asset-ft"
const NETWORK = STACKS_DEVNET

const Page = () => {
  const { connected, getConnect, getDisconnect, stxAddress } = useWallet()

  const { data } = useQuery({
    ...getFtBalances(stxAddress || ""),
  })

  function safeUint(value: string | number) {
    const num = BigInt(value || 0)
    return Cl.uint(num)
  }

  const ftArgs = [
    Cl.contractPrincipal(CONTRACT_ADDRESS, "mock-token"),

    Cl.tuple({
      taker: Cl.none(),
      amt: safeUint(100000),
      expiry: safeUint(10000000),
      price: safeUint(10),
      "payment-asset-contract": Cl.none(),
    }),
  ]

  const whiteArgs = [
    Cl.contractPrincipal(
      "ST3FM52ANQES92X27AP9ZV9Z676MHP7QP2J79RTH9",
      "bme030-0-reputation-token"
    ),
    Cl.bool(true),
  ]

  const ftListings = async () => {
    await getRequest({
      args: ftArgs,
      functionName: "list-asset-ft",
    })
  }

  const whiteListings = async () => {
    await getRequest({
      args: whiteArgs,
      functionName: "set-whitelisted",
      postMode: false,
    })
  }

  return (
    <div className="flex max-w-md flex-col gap-4 rounded-lg border p-20">
      {!connected ? (
        <Button onClick={() => getConnect()}>Connect</Button>
      ) : (
        <Button variant={"destructive"} onClick={() => getDisconnect()}>
          Disconnect
        </Button>
      )}
      {connected ? (
        <div className="flex max-w-md flex-col gap-4 rounded-lg border p-12">
          <Button variant={"outline"} onClick={ftListings}>
            FT Listings
          </Button>

          <Button variant={"outline"} onClick={whiteListings}>
            White Listings
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default Page
