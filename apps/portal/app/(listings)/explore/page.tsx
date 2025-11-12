import { getWalletAddress } from "@/db/actions/wallet"
import { dalFormatErrorMessage, dalVerifySuccess } from "@/db/helpers"
import React from "react"

import EmptyListing from "../_components/empty-listings"
import { getListings } from "@/db/actions/listing"
import { ListingCard } from "../_components/listing-card"
import { getContractNameAddress } from "@/lib/utils"

const Page = async () => {
    const stxAddress = await getWalletAddress()

    const res = await getListings("explore", stxAddress || '')

    if (!res.success) {
        if (res.error?.type === "no-data")
            return (
                <div className="container mx-auto px-4 py-8">
                    <h1 className="mb-8 text-3xl font-bold">Marketplace Listings</h1>
                    <EmptyListing href="/your-apts" label="Explore Apts" />
                </div>
            )

        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-3xl font-bold">Marketplace Listings</h1>
                <p className="text-sm text-destructive">
                    {dalFormatErrorMessage(res.error)}
                </p>
            </div>
        )
    }

    const listings = dalVerifySuccess(res)

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold">Marketplace Listings</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.contract}
                        listing={listing}
                        href={`/explore/${(listing.contract)}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Page
