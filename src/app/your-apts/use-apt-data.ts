import { useWallet } from "@/providers/wallet-provider"
import { getBlockHeight, getYourApts } from "@/services/query-options"
import { useQuery } from "@tanstack/react-query"

export function useAptData() {
  const { connected, stxAddress } = useWallet()

  const {
    data: yourApts,
    isLoading: isYourAptsLoading,
    isSuccess: isYourAptsSuccess,
  } = useQuery({
    ...getYourApts(stxAddress || ""),
    enabled: connected && !!stxAddress,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  })

  const {
    data: blockHeightData,
    isLoading: isBlockHeightLoading,
    isSuccess: isBlockHeightSuccess,
  } = useQuery({
    ...getBlockHeight(),
    enabled: connected,
  })

  const currentBlockHeight = blockHeightData?.chain_tip?.block_height || 0

  return {
    currentBlockHeight,
    items: yourApts?.items || [],
    isLoading: isYourAptsLoading || isBlockHeightLoading,
    isSuccess: isYourAptsSuccess && isBlockHeightSuccess,
  }
}
