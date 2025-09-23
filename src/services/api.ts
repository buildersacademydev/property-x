import { request } from "@stacks/connect"
import { toast } from "sonner"
import { apiClient } from "@/lib/config/api-client"
import { env } from "@/lib/config/env"

import {
  TBlockHeightResponse,
  TFtBalancesResponse,
  TPostBalancesWhitelistResponse,
  TTestCoin,
} from "./type"

export class ApiService {
  private static readonly BASE_PATH =
    env.NETWORK === "testnet"
      ? "https://api.testnet.hiro.so/extended"
      : env.NETWORK === "mainnet"
        ? "https://api.hiro.so/extended"
        : "http://localhost:3999/extended"

  static async getBlockHeight(): Promise<TBlockHeightResponse> {
    const response = await apiClient.get(`${this.BASE_PATH}`)
    return response.data
  }

  static async getAccountAssets(stxAddress: string): Promise<void> {
    const response = await apiClient.get(
      `${this.BASE_PATH}/v1/address/${stxAddress}/assets`
    )
    return response.data
  }

  static async getFtBalances(stxAddress: string): Promise<TFtBalancesResponse> {
    const response = await apiClient.get(
      `${this.BASE_PATH}/v2/addresses/${stxAddress}/balances/ft?limit=100&offset=0`
    )
    return response.data
  }

  static async postBalancesWhitelist({
    balances,
  }: {
    balances: TFtBalancesResponse["results"]
  }): Promise<{ items: TPostBalancesWhitelistResponse[] }> {
    const response = await apiClient.post("/api/apts", {
      balances: balances,
    })
    return response.data
  }

  static async getTestCoin(url: string): Promise<TTestCoin> {
    const response = await apiClient.get(url)
    return response.data
  }
}

const CONTRACT_NAME = "marketplace"

export const getRequest = async ({
  args,
  postMode = true,
  functionName,
}: {
  args: any[]
  postMode?: boolean
  functionName: string
}) => {
  try {
    const response = await request("stx_callContract", {
      contract: `${env.CONTRACT_ADDRESS}.${CONTRACT_NAME}`,
      functionName: functionName,
      functionArgs: args,
      network: env.NETWORK,
      postConditionMode: postMode ? "allow" : "deny",
    })
    return response
  } catch (error) {
    console.error("Error calling contract:", error)
    toast.error(
      "Error calling contract: " +
        (error instanceof Error ? error.message : "Unknown error")
    )
  }
}
