import { apiClient } from "@/lib/config/api-client"

import { TBlockHeightResponse } from "./type"

export class ApiService {
  private static readonly BASE_PATH = "https://api.testnet.hiro.so/extended"

  static async getBlockHeight(): Promise<TBlockHeightResponse> {
    const response = await apiClient.get(`${this.BASE_PATH}`)
    return response.data
  }
}
