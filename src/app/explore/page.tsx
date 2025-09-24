import { db } from "@/db/drizzle"
import { assets, listings, tcoins, whiteListing } from "@/db/schema"
import { TMarketplaceListing } from "@/services/type"
import { eq } from "drizzle-orm"
import React, { Suspense } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { BuyNowDialog } from "./_components/buy-now-dialog"
import EmptyExplore from "./_components/empty-explore"
import LoadingExplore from "./_components/loading-explore"
import { ViewDetailsDialog } from "./_components/view-details-dialog"

async function ListingsContent() {
  const listingsData = await db
    .select({
      listingId: listings.listingId,
      amount: listings.amount,
      expiry: listings.expiry,
      maker: listings.maker,
      paymentAssetContract: listings.paymentAssetContract,
      price: listings.price,
      taker: listings.taker,
      topic: listings.topic,
      assetContract: listings.assetContract,
      contractName: tcoins.name,
      contractDescription: tcoins.description,
      contractImage: tcoins.image,
      assetName: assets.name,
      assetImage: assets.image,
      assetLocation: assets.location,
      assetValuation: assets.valuation,
      assetTokens: assets.tokens,
      assetApr: assets.apr,
      assetDescription: assets.description,
      assetStaking: assets.staking,
    })
    .from(listings)
    .innerJoin(
      whiteListing,
      eq(listings.assetContract, whiteListing.whitelisted)
    )
    .innerJoin(tcoins, eq(listings.assetContract, tcoins.contract))
    .innerJoin(assets, eq(tcoins.assetId, assets.id))
    .where(eq(whiteListing.isWhitelisted, true))

  if (listingsData.length === 0) {
    return <EmptyExplore />
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {listingsData.map((listing) => (
        <ListingCard key={listing.listingId} listing={listing} />
      ))}
    </div>
  )
}

function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Marketplace Listings</h1>
      <Suspense fallback={<LoadingExplore />}>
        <ListingsContent />
      </Suspense>
    </div>
  )
}

function ListingCard({ listing }: { listing: TMarketplaceListing }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="relative mb-3 aspect-video overflow-hidden rounded-lg">
          <Image
            src={listing.assetImage}
            alt={listing.assetName}
            fill
            className="object-contain"
          />
        </div>
        <CardTitle className="line-clamp-2">{listing.assetName}</CardTitle>
        <CardDescription className="line-clamp-2">
          {listing.contractName} • {listing.assetLocation}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Price</p>
            <p className="font-semibold">{listing.price}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Amount</p>
            <p className="font-semibold">{listing.amount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">APR</p>
            <p className="font-semibold">{listing.assetApr}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Tokens</p>
            <p className={"font-semibold"}>{listing.assetTokens}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-3">
        <BuyNowDialog listing={listing}>
          <Button className="flex-1">Buy Now</Button>
        </BuyNowDialog>

        <ViewDetailsDialog listing={listing}>
          <Button variant="outline" className="flex-1">
            View Details
          </Button>
        </ViewDetailsDialog>
      </CardFooter>
    </Card>
  )
}

export default Page
