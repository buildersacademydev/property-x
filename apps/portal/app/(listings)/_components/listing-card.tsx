import { TGroupedListing } from "@/services/type"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import SpotlightCard from "@workspace/ui/components/spotlight-card"
import { Icons } from "@workspace/ui/components/icons"
import { getContractNameAddress, convertAmount, formatNumber } from "@/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import { BuyNowDialog } from "./buy-now-dialog"

const listingCardVariants = {
    default: "hover:border-muted-foreground/20",
    "buy-now": "hover:border-primary/30 hover:shadow-md transition-all duration-200",
} as const


interface BaseListingCardProps {
    listing: TGroupedListing
}

interface DefaultListingCardProps extends BaseListingCardProps {
    variant?: "default"
    href: string
}

interface BuyNowListingCardProps extends BaseListingCardProps {
    variant: "buy-now"
    listingId: number
    price: number
    amount: number
    maker: string
    expiry: number
    onBuyClick?: () => void
}

type ListingCardProps = DefaultListingCardProps | BuyNowListingCardProps

export function ListingCard(props: ListingCardProps) {
    const { listing } = props
    const variant = props.variant || "default"
    const contractAddress = getContractNameAddress(listing.contract).contractAddress

    const CardContent = (
        <SpotlightCard
            className="p-0 h-full"
            spotlightColor="rgba(231, 116, 47, 0.2)"
        >
            <div className="flex flex-col h-full">
                <div className="relative min-h-80 w-full overflow-hidden">
                    <Image
                        src={listing.assetImage}
                        alt={listing.assetName}
                        fill
                        className="object-contain group-hover:scale-105 duration-100 transition-all"
                    />
                </div>
                <div className="p-4 text-muted-foreground bg-muted flex flex-col gap-3">
                    <div className="flex items-end justify-between">
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
                        {variant === "default" && (
                            <div className="relative group-hover:text-primary">
                                <Icons.arrowRight className="group-hover:opacity-0 transition-opacity duration-200" />
                                <Icons.chevronRight className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </div>
                        )}
                    </div>

                    {variant === "buy-now" && props.variant === "buy-now" && (
                        <div className="space-y-3 pt-2 border-t border-border">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-muted-foreground">Listing #{props.listingId + 1}</span>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                    {props.amount} Tokens
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">
                                    {props.maker.slice(0, 6)}...{props.maker.slice(-4)}
                                </span>
                                <span className="text-muted-foreground">
                                    Exp: {formatNumber(props.expiry)}
                                </span>
                            </div>
                            {/* <BuyNowDialog /> */}
                        </div>
                    )}
                </div>
            </div>
        </SpotlightCard>
    )

    if (variant === "default" && props.variant !== "buy-now") {
        return (
            <Link
                href={props.href}
                className={cn(
                    "block group border border-muted rounded-sm shadow-2xs",
                    listingCardVariants[variant]
                )}
            >
                {CardContent}
            </Link>
        )
    }

    return (
        <div className={cn(
            "block group border border-muted rounded-sm shadow-2xs",
            listingCardVariants[variant]
        )}>
            {CardContent}
        </div>
    )
}