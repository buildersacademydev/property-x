import { queryOptions } from "@tanstack/react-query"

import { ApiService } from "./api"

export const getBlockHeight = () =>
  queryOptions({
    queryKey: ["block-height"],
    queryFn: () => ApiService.getBlockHeight(),
  })
