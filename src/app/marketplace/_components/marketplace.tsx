"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/common/icons"
import NextImage from "@/components/common/next-image"

import { useTokenListings } from "../hooks/use-token-listings"
import ListEmpty from "./list-empty"
import ListLoading from "./list-loading"

const Marketplace = () => {
  const { isLoading, data } = useTokenListings({ variant: "marketplace" })

  const handleBuyNow = () => {
    alert("Buy Now functionality is not implemented yet.")
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-12">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Discover listed property tokens and start earning yield.
          </p>
        </div>
      </div>

      {isLoading && <ListLoading />}

      {!isLoading && (!data || data.length === 0) && <ListEmpty />}

      {!isLoading && data && data.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((item: any) => {
            const detail = item.imageUrl
            const asset = detail?.asset
            const displayName =
              (asset?.name || item.name || item.symbol || "Unnamed Token") +
              (item.symbol ? ` (${item.symbol})` : "")
            const apr = asset?.apr || detail?.asset?.apr
            const location = asset?.location
            const valuation = asset?.valuation
            const tokens = asset?.tokens
            const image = detail?.image || asset?.image
            const price = item.price // raw uint number
            const formattedPrice = price ? price.toLocaleString() : "—"
            const tokenAmount = item.tokenAmount

            return (
              <Card
                key={item.id}
                className={cn(
                  `group relative overflow-hidden border-primary/10 bg-card/80
                  backdrop-blur-sm transition-all duration-300
                  hover:border-primary/30 hover:shadow-lg`
                )}
              >
                <CardHeader className="pb-0">
                  <div className="relative -mx-6 mb-4 px-6">
                    <div
                      className="relative aspect-[4/3] w-full overflow-hidden
                        rounded-lg"
                    >
                      {image ? (
                        <NextImage
                          src={image}
                          alt={displayName}
                          width={480}
                          height={360}
                          className="object-cover"
                          showSkeleton
                        />
                      ) : (
                        <div
                          className="flex h-full w-full items-center
                            justify-center rounded-lg bg-muted
                            text-muted-foreground"
                        >
                          <Icons.dollarSign className="h-8 w-8" />
                        </div>
                      )}
                      {apr && (
                        <div
                          className="absolute top-3 left-3 rounded-md
                            bg-primary/90 px-2 py-1 text-xs font-medium
                            text-primary-foreground shadow"
                        >
                          APR {apr}
                        </div>
                      )}
                      {item.isUserListing && (
                        <div
                          className="absolute top-3 right-3 rounded-md
                            bg-secondary/90 px-2 py-1 text-[10px] font-medium
                            tracking-wide text-secondary-foreground uppercase
                            shadow"
                        >
                          Your Listing
                        </div>
                      )}
                    </div>
                    <CardTitle className="mt-1 truncate text-base font-semibold">
                      {displayName}
                    </CardTitle>
                    <CardDescription className="truncate text-xs">
                      {location || detail?.description || "Property token"}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-muted-foreground">Tokens</p>
                      <p className="font-medium">
                        {tokens || tokenAmount?.toLocaleString?.() || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ask Price</p>
                      <p className="font-medium">{formattedPrice}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Valuation</p>
                      <p className="font-medium">{valuation || "—"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expiry</p>
                      <p className="font-medium">
                        {item.expiry
                          ? new Date(item.expiry * 1000).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="mt-auto flex flex-col gap-2 pt-0">
                  <div className="flex w-full gap-2">
                    <Button
                      className="flex-1"
                      variant="default"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </Button>
                    <Button className="flex-1" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Marketplace
