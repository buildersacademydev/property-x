import { request } from "@stacks/connect"
import { STACKS_DEVNET, STACKS_MAINNET, STACKS_TESTNET } from "@stacks/network"
import { apiClient } from "@/lib/config/api-client"

import {
  TBlockHeightResponse,
  TFtBalancesResponse,
  TPostBalancesWhitelistResponse,
  TTestCoin,
} from "./type"

const NETWORK_ENV = process.env.NEXT_PUBLIC_NETWORK
const NETWORK =
  NETWORK_ENV === "testnet"
    ? STACKS_TESTNET
    : NETWORK_ENV === "mainnet"
      ? STACKS_MAINNET
      : STACKS_DEVNET

export class ApiService {
  private static readonly BASE_PATH =
    NETWORK === STACKS_TESTNET
      ? "https://api.testnet.hiro.so/extended"
      : NETWORK === STACKS_MAINNET
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

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ""
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
      contract: `${CONTRACT_ADDRESS}.${CONTRACT_NAME}`,
      functionName: functionName,
      functionArgs: args,
      network: NETWORK,
      postConditionMode: postMode ? "allow" : "deny",
    })
    return response
  } catch (error) {
    console.error("Error calling contract:", error)
    alert(
      "Error calling contract: " +
        (error instanceof Error ? error.message : "Unknown error")
    )
  }
}
