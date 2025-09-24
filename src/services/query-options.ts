import { queryOptions } from "@tanstack/react-query"

import { ApiService } from "./api"

export const getBlockHeight = () => {
  return queryOptions({
    queryKey: ["block-height"],
    queryFn: () => ApiService.getBlockHeight(),
  })
}

export const getYourApts = (stxAddress: string) => {
  return queryOptions({
    queryKey: ["your-apts", stxAddress],
    queryFn: () => ApiService.getYourApts(stxAddress),
  })
}
