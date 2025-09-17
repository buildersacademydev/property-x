"use client"

import { useWallet } from "@/providers/wallet-provider"
import { STACKS_DEVNET } from "@stacks/network"
import React from "react"
import { Button } from "@/components/ui/button"

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ""
const CONTRACT_NAME = "marketplace"
const FUNCTION_NAME = "list-asset-ft"
const NETWORK = STACKS_DEVNET

const parseContractPrincipal = (contractString: string): [string, string] => {
  const parts = contractString.split(".")
  if (parts.length !== 2) {
    throw new Error("Invalid contract format. Use: address.contractName")
  }
  return [parts[0], parts[1]]
}

const Page = () => {
  const { connected, getConnect, getDisconnect } = useWallet()

  const ftListings = async () => {
    try {
      const [contractAddress, contractName] = parseContractPrincipal(
        `${CONTRACT_ADDRESS}.mock-token`
      )

      const { Cl, cvToJSON } = await import("@stacks/transactions")
      const { request } = await import("@stacks/connect")

      function safeUint(value: string | number) {
        const num = BigInt(value || 0)
        return Cl.uint(num)
      }

      const args = [
        Cl.contractPrincipal(contractAddress, contractName),

        Cl.tuple({
          taker: Cl.none(),

          amt: safeUint(1000000),
          expiry: safeUint(1000),
          price: safeUint(10),

          "payment-asset-contract": Cl.none(),
        }),
      ]

      const response = await request("stx_callContract", {
        contract: `${CONTRACT_ADDRESS}.${CONTRACT_NAME}`,
        functionName: FUNCTION_NAME,
        functionArgs: args,

        network: "devnet",
        postConditionMode: "allow",
      })

      if (response) {
        console.log("listing responce: ", response)
      }
    } catch (error) {
      console.error("Error calling contract:", error)
      alert(
        "Error calling contract: " +
          (error instanceof Error ? error.message : "Unknown error")
      )
    }
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
        <Button variant={"outline"} onClick={ftListings}>
          FT Listings
        </Button>
      ) : null}
    </div>
  )
}

export default Page
