import { useWallet } from "@/providers/wallet-provider"
import { postBalancesWhitelist } from "@/services/mutation-options"
import { getBlockHeight, getFtBalances } from "@/services/query-options"
import { TPostBalancesWhitelistResponse } from "@/services/type"
import { useMutation, useQuery } from "@tanstack/react-query"
import React from "react"
import { getQueryClient } from "@/lib/config/query-client"

interface CachedResponse {
  items: TPostBalancesWhitelistResponse[]
}

const DEFAULT_CACHED_RESPONSE: CachedResponse = { items: [] }

export function useAptData() {
  const { connected, stxAddress } = useWallet()
  const queryClient = getQueryClient()

  const { data, isSuccess } = useQuery({
    ...getFtBalances(stxAddress || ""),
    enabled: connected && !!stxAddress,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })

  const { data: blockHeightData } = useQuery({
    ...getBlockHeight(),
    enabled: connected,
  })

  const whitelistMutation = useMutation({
    ...postBalancesWhitelist(),
    onSuccess: (res) => {
      queryClient.setQueryData<CachedResponse>(
        ["apt-data", stxAddress],
        res as CachedResponse
      )
    },
    onError: (err) => {
      console.error("❌ Error in mutation:", err)
    },
  })

  const whitelistQuery = useQuery<CachedResponse | null, Error, CachedResponse>(
    {
      queryKey: ["apt-data", stxAddress],
      queryFn: async () => null,
      enabled: false,
      staleTime: Infinity,
      initialData: () =>
        queryClient.getQueryData<CachedResponse>(["apt-data", stxAddress]) ??
        DEFAULT_CACHED_RESPONSE,
      select: (data) => data ?? DEFAULT_CACHED_RESPONSE,
    }
  )

  React.useEffect(() => {
    if (isSuccess && data?.results?.length) {
      whitelistMutation.mutate({ balances: data.results })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data])

  const currentBlockHeight = blockHeightData?.chain_tip.block_height

  return {
    currentBlockHeight,
    items: whitelistQuery.data?.items ?? whitelistMutation.data?.items ?? [],
    isLoading: whitelistMutation.isPending,
    isSuccess: whitelistQuery.isSuccess && whitelistMutation.isSuccess,
  }
}
