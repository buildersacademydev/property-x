import { getListings } from "@/db/actions/listing"
import { dalFormatErrorMessage, dalVerifySuccess } from "@/db/helpers"
import React from "react"
import { Button } from "@/components/ui/button"

import EmptyListing from "../_components/empty-listing"
import ListingCard from "../_components/listing-card"
import { ViewDetailsDialog } from "../_components/view-details-dialog"

async function ListingsContent() {
  const res = await getListings("your-listings")

  if (!res.success) {
    if (res.error?.type === "no-data") {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold">Your Listings</h1>
          <EmptyListing href="/explore" label="Explore Marketplace" />
        </div>
      )
    }
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-2 text-3xl font-bold">Your Listings</h1>
        <p className="text-sm text-destructive">
          {dalFormatErrorMessage(res.error)}
        </p>
      </div>
    )
  }

  const listings = dalVerifySuccess(res)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Listings</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard key={listing.listingId} listing={listing}>
            <Button className="flex-1" variant="outline">
              Edit
            </Button>
            <ViewDetailsDialog listing={listing}>
              <Button className="flex-1">View Details</Button>
            </ViewDetailsDialog>
          </ListingCard>
        ))}
      </div>
    </div>
  )
}

export default function Page() {
  return <ListingsContent />
}
