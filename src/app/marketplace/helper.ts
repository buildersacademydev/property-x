import { ClarityValue, TupleData } from "@stacks/transactions"

export const getProcessedListing = ({
  tupleWrapper,
  i,
  stxAddress,
  expiry,
}: {
  tupleWrapper: TupleData<ClarityValue>
  i: number
  stxAddress: string
  expiry: number
}) => {
  return {
    id: i,
    tokenAmount: Number(
      tupleWrapper.amt?.type === "uint" ? tupleWrapper.amt.value : 0
    ),
    maker:
      tupleWrapper.maker?.type === "address" ? tupleWrapper.maker.value : null,
    taker:
      tupleWrapper.taker?.type === "address" ? tupleWrapper.taker.value : null,
    ftAssetContract:
      tupleWrapper["ft-asset-contract"]?.type === "contract"
        ? tupleWrapper["ft-asset-contract"].value
        : null,
    expiry,
    price: Number(
      tupleWrapper.price?.type === "uint" ? tupleWrapper.price.value : 0
    ),
    paymentAssetContract:
      tupleWrapper["payment-asset-contract"]?.type === "address"
        ? tupleWrapper["payment-asset-contract"].value
        : null,
    type: "ft",
    isUserListing:
      (tupleWrapper.maker?.type === "address"
        ? tupleWrapper.maker.value
        : null) === stxAddress,
  }
}

export const hasToken = (item: any): item is { b: string } => "b" in item
export const hasFtAssetContract = (item: any): item is { a: string } =>
  "a" in item

export const getContractInfo = (
  item: any,
  variant: "marketplace" | "userListings" | "ownedNfts"
) => {
  let contractAddress = ""
  let contractName = ""

  if (variant === "marketplace" || variant === "userListings") {
    const ftAsset: string | null | undefined = item?.ftAssetContract
    if (ftAsset) {
      const [addr, name] = ftAsset.split(".")
      contractAddress = addr || ""
      contractName = name || ""
    }
  } else if (variant === "ownedNfts") {
    // ownedNfts entries come from ownedNftsData which is based on whitelisted data enriched with imageUrl
    if (item?.contractAddress && item?.contractName) {
      contractAddress = item.contractAddress
      contractName = item.contractName
    } else if (typeof item?.token === "string") {
      // token like "SP123.contract::TOKEN" -> take the contract part before '::'
      const contractPart = item.token.split("::")[0]
      const [addr, name] = contractPart.split(".")
      contractAddress = addr || ""
      contractName = name || ""
    }
  }

  return { contractAddress, contractName }
}
