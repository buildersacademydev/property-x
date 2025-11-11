import { TGroupedListing } from "@/services/type"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import SpotlightCard from "@workspace/ui/components/spotlight-card"
import { Icons } from "@workspace/ui/components/icons"
import { getContractNameAddress } from "@/lib/utils"

interface ListingCardProps {
    listing: TGroupedListing
    href: string
}

export function ListingCard({ listing, href }: ListingCardProps) {
    const contractAddress = getContractNameAddress(listing.contract).contractAddress
    return (
        <Link href={href} className="block group border border-muted rounded-sm shadow-2xs">
            <SpotlightCard
                className="p-0 h-full "
                spotlightColor="rgba(231, 116, 47, 0.2)"
            >
                <div className="flex flex-col">
                    <div className="relative min-h-80 w-full overflow-hidden">
                        <Image
                            src={listing.assetImage}
                            alt={listing.assetName}
                            fill
                            className="object-contain group-hover:scale-105 duration-100 transition-all"
                        />
                    </div>
                    <div className="p-4 text-muted-foreground bg-muted flex items-end justify-between">
                        <div className='flex flex-col gap-1'>
                            <h1 className='font-mono leading-snug text-accent-foreground flex items-center gap-1.5'>
                                <span>{listing.assetName}</span>
                                <span className="text-muted-foreground">·</span>
                                <span className="text-sm text-muted-foreground">
                                    {contractAddress.slice(0, 2)}..{contractAddress.slice(-2)}
                                </span>
                            </h1>
                            <p className="text-sm">{listing.assetLocation}</p>
                        </div>
                        <div className="relative group-hover:text-primary">
                            <Icons.arrowRight className="group-hover:opacity-0 transition-opacity duration-200" />
                            <Icons.chevronRight className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>
                    </div>
                </div>
            </SpotlightCard>
        </Link>
    )
}