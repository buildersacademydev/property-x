import { mutationOptions } from "@tanstack/react-query"

import { ApiService } from "./api"
import { TFtBalancesResponse } from "./type"

export const postBalancesWhitelist = () =>
  mutationOptions({
    mutationKey: ["post-balances-whitelist"],
    mutationFn: async ({
      balances,
    }: {
      balances: TFtBalancesResponse["results"]
    }) => ApiService.postBalancesWhitelist({ balances }),
  })
