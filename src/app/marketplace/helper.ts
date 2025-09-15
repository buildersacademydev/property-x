import { TFtListing } from "@/services/type"
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

// export const getEnrichedMarketplaceListings = ({ marketplaceListings }: { marketplaceListings: TFtListing[] }) => {
//     return marketplaceListings.map(async (listing) => {
//         const assetContract = listing.ftAssetContract;
//         if (!assetContract) return listing;
//         const [assetContractAddress, assetContractName] = assetContract.split('.');
//         const name = await getTokenName(assetContractAddress, assetContractName);
//         const imageUrl = await getFtImageUrl(assetContractAddress, assetContractName);
//         const symbol = await getTokenSymbol(assetContractAddress, assetContractName);
//         return { ...listing, name, imageUrl, symbol };
//     })
// };
