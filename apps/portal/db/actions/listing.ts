import { eq } from "drizzle-orm"
import { unstable_cache } from "next/cache"

import { db } from "../drizzle"
import { dalDbOperation } from "../helpers"
import { assets, listings, tcoins, whiteListing } from "../schema"
import { ThrowableDalError } from "../type"
import { TGroupedListing } from "@/services/type"

export async function getListingsCore(
    type: "your-listings" | "explore",
    stxAddress: string
) {
    return dalDbOperation(async () => {
        const listingsData = await db
            .select({
                contract: listings.assetContract,
                assetLocation: assets.location,
                name: tcoins.name,
                image: tcoins.image,
                assetName: assets.name,
                assetImage: assets.image,
                price: listings.price,
                maker: listings.maker
            })
            .from(listings)
            .innerJoin(
                whiteListing,
                eq(listings.assetContract, whiteListing.whitelisted)
            )
            .innerJoin(tcoins, eq(whiteListing.whitelisted, tcoins.contract))
            .innerJoin(assets, eq(tcoins.assetId, assets.id))

        if (listingsData.length === 0) {
            throw new ThrowableDalError({ type: "no-data" })
        }


        const yourListings = listingsData.filter((l) => {
            return l.maker === stxAddress
        })

        const exploreListings = listingsData.filter((l) => {
            if (!stxAddress) return true;
            return l.maker !== stxAddress
        })

        if (type === "your-listings" && yourListings.length === 0) {
            throw new ThrowableDalError({ type: "no-data" })
        }
        if (type === "explore" && exploreListings.length === 0) {
            throw new ThrowableDalError({ type: "no-data" })
        }

        return type === "your-listings" ? groupToCards(yourListings) : groupToCards(exploreListings)
    })
}

export const getListings = unstable_cache(getListingsCore, ["listing-data"], {
    tags: ["listings"],
    revalidate: 3600,
})

function groupToCards(list: TGroupedListing[]): TGroupedListing[] {
    const map = new Map()

    list.forEach(item => {
        if (!map.has(item.contract)) {
            map.set(item.contract, {
                contract: item.contract,
                assetLocation: item.assetLocation,
                name: item.name,
                image: item.image,
                assetName: item.assetName,
                assetImage: item.assetImage,
            })
        }
    })

    return Array.from(map.values())
}
