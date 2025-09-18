import { apiClient } from "@/lib/config/api-client"

import { TBlockHeightResponse, TFtBalancesResponse, TTestCoin } from "./type"

export class ApiService {
  private static readonly BASE_PATH = "https://api.testnet.hiro.so/extended"

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

  static async getTestCoin(url: string): Promise<TTestCoin> {
    const response = await apiClient.get(url)
    return response.data
  }
}
