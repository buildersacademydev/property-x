import { apiClient } from "@/lib/config/api-client"

import { TBlockHeightResponse, TFtBalancesResponse } from "./type"

export class ApiService {
  private static readonly BASE_PATH = "https://api.testnet.hiro.so/extended"

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

  static async fetchJson<T = any>(url: string): Promise<T> {
    const response = await apiClient.get(url)
    return response.data as T
  }
}
