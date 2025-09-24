import { request } from "@stacks/connect"
import { Cl } from "@stacks/transactions"
import { apiClient } from "@/lib/config/api-client"
import { env } from "@/lib/config/env"
import { getContractNameAddress, safeUint } from "@/lib/utils"

import {
  TBlockHeightResponse,
  TFtBalancesResponse,
  TListSaleBlockHeight,
  TTestCoin,
  TWhitelistContractSchema,
  TYourAptsResponse,
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

  static async getFtBalances(stxAddress: string): Promise<TFtBalancesResponse> {
    const response = await apiClient.get(
      `${this.BASE_PATH}/v2/addresses/${stxAddress}/balances/ft?limit=100&offset=0`
    )
    return response.data
  }

  static async getYourApts(
    stxAddress: string
  ): Promise<{ items: TYourAptsResponse[] }> {
    const response = await apiClient.get("/api/apts", {
      params: { address: stxAddress },
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
  args: any
  postMode?: boolean
  functionName: string
}) => {
  try {
    return await request("stx_callContract", {
      contract: `${env.CONTRACT_ADDRESS}.${CONTRACT_NAME}`,
      functionName,
      functionArgs: args,
      network: env.NETWORK,
      postConditionMode: postMode ? "allow" : "deny",
    })
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Unknown contract call error")
  }
}

export class ContractService {
  static async whitelistContract({
    whitelisted,
    isWhitelisted,
  }: TWhitelistContractSchema) {
    const { contractAddress, contractName } =
      getContractNameAddress(whitelisted)
    const args = [
      Cl.contractPrincipal(contractAddress, contractName),
      Cl.bool(isWhitelisted),
    ]
    return await getRequest({
      args,
      functionName: "set-whitelisted",
      postMode: false,
    })
  }

  static async listAptForSale({
    currentBlockHeight,
    ...values
  }: TListSaleBlockHeight) {
    const finalPrice =
      values.paymentAsset !== "STX"
        ? values.listingPrice * 100
        : values.listingPrice
    const args = [
      Cl.contractPrincipal(env.CONTRACT_ADDRESS, "mock-token"),
      Cl.tuple({
        taker: Cl.none(),
        amt: safeUint(values.amount * 1000000),
        expiry: safeUint(currentBlockHeight + Number(values.listingDuration)),
        price: safeUint(finalPrice),
        "payment-asset-contract":
          values.paymentAsset === "STX"
            ? Cl.none()
            : Cl.some(Cl.principal(values.paymentAsset)),
      }),
    ]
    return await getRequest({
      args,
      functionName: "list-asset-ft",
    })
  }
}
