import { db } from "@/db/drizzle"
import { assets, listings, tcoins, whiteListing } from "@/db/schema"
import { eq } from "drizzle-orm"
import React from "react"
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
import { ViewDetailsDialog } from "./_components/view-details-dialog"

type ListingWithDetails = {
  listingId: number
  amount: number
  expiry: number
  maker: string
  paymentAssetContract: string | null
  price: number
  taker: string | null
  topic: string
  assetContract: string
  contractName: string
  contractDescription: string
  contractImage: string
  assetName: string
  assetImage: string
  assetLocation: string
  assetValuation: string
  assetTokens: string
  assetApr: string
  assetDescription: string
  assetStaking: string
}

const Page = async () => {
  // Fetch listings with joined data
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Listings</h1>

      {listingsData.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No listings found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listingsData.map((listing) => (
            <ListingCard key={listing.listingId} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}

function ListingCard({ listing }: { listing: ListingWithDetails }) {
  const expiryDate = new Date(listing.expiry * 1000).toLocaleDateString()
  const isExpired = listing.expiry * 1000 < Date.now()

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
            <p className="font-semibold">{listing.price} tokens</p>
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
            <p className="text-muted-foreground">Expires</p>
            <p
              className={`font-semibold ${isExpired ? "text-destructive" : ""}`}
            >
              {expiryDate}
            </p>
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
