import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getListingsByToken } from '@/db/actions/listing'
import { dalFormatErrorMessage, dalVerifySuccess } from '@/db/helpers'
import { Separator } from '@workspace/ui/components/separator'
import { formatNumber } from '@/lib/utils'
import { ListingWithBuy } from './listing-with-buy'

interface PageProps {
    params: {
        'token-detail': string
    }
}

const Page = async ({ params }: PageProps) => {
    const contractAddress = params['token-detail']

    const res = await getListingsByToken(contractAddress)

    if (!res.success) {
        if (res.error?.type === 'no-data') {
            notFound()
        }
        return (
            <div className="container mx-auto px-4 py-8">
                <p className="text-sm text-destructive">
                    {dalFormatErrorMessage(res.error)}
                </p>
            </div>
        )
    }

    const listings = dalVerifySuccess(res)

    const tokenInfo = listings[0]?.tokenInfo
    const assetInfo = listings[0]?.assetInfo

    if (!tokenInfo || !assetInfo) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
                    <div className="relative h-64 w-full overflow-hidden rounded-lg border md:h-96 md:w-96">
                        <Image
                            src={tokenInfo.image}
                            alt={tokenInfo.name}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    <div className="flex-1">
                        <h1 className="mb-2 text-4xl font-bold">{tokenInfo.name}</h1>
                        <p className="mb-4 text-muted-foreground">
                            {tokenInfo.description}
                        </p>

                        <Separator className="my-6" />

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold">Asset Information</h2>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">Asset Name</p>
                                    <p className="font-medium">{assetInfo.assetName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Location</p>
                                    <p className="font-medium">{assetInfo.assetLocation}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Valuation</p>
                                    <p className="font-medium">${formatNumber(assetInfo.assetValuation)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Separator className="my-8" />

            <div>
                <h2 className="mb-6 text-2xl font-semibold">
                    Available Listings ({listings.length})
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {listings.map((listing) => (
                        <ListingWithBuy
                            key={listing.listingId}
                            listing={{
                                contract: contractAddress,
                                name: tokenInfo.name,
                                image: tokenInfo.image,
                                assetName: assetInfo.assetName,
                                assetImage: assetInfo.assetImage,
                                assetLocation: assetInfo.assetLocation,
                            }}
                            listingId={listing.listingId}
                            price={listing.price}
                            amount={listing.amount}
                            maker={listing.maker}
                            expiry={listing.expiry}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Page