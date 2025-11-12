import { TGroupedListing, TSingleTokenListing, TMarketplaceListing } from "@/services/type"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import SpotlightCard from "@workspace/ui/components/spotlight-card"
import { Icons } from "@workspace/ui/components/icons"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import { BuyNowDialog } from "./buy-now-dialog"
import { UpdateListingDialog } from "../your-listings/_components/update-listing-dialog"
import { CancelListingAlert } from "../your-listings/_components/cancel-listing-alert"
import { Button } from "@workspace/ui/components/button"

type BaseListingCardProps = {
    listing: TGroupedListing
    contractAddress: string
    className?: string
}

type DefaultVariantProps = BaseListingCardProps & {
    variant: "default"
    href: string
}

type BuyNowVariantProps = BaseListingCardProps & {
    variant: "buy-now"
    listing: TSingleTokenListing
}

type YourListingVariantProps = BaseListingCardProps & {
    variant: "your-listing"
    listing: TSingleTokenListing
}

type ListingCardProps = DefaultVariantProps | BuyNowVariantProps | YourListingVariantProps

export function ListingCard(props: ListingCardProps) {
    const { listing, variant, contractAddress, className } = props

    const cardContent = (
        <SpotlightCard
            className="p-0 h-full"
            spotlightColor="rgba(231, 116, 47, 0.2)"
        >
            <div className="flex flex-col h-full">
                <div className="relative min-h-80 w-full overflow-hidden">
                    <Image
                        src={listing.image}
                        alt={listing.assetName}
                        fill
                        className="object-contain group-hover:scale-105 duration-100 transition-all"
                    />
                </div>

                <div className="p-4 text-muted-foreground bg-muted flex flex-col gap-3">
                    <ListingCardHeader
                        listing={listing}
                        contractAddress={contractAddress}
                        showArrow={variant === "default"}
                    />

                    {variant === "buy-now" && (
                        <ListingCardBuyCta listing={listing} />
                    )}

                    {variant === "your-listing" && (
                        <ListingCardYourListingCta listing={listing} />
                    )}
                </div>
            </div>
        </SpotlightCard>
    )

    const cardClassName = cn(
        "block group border border-muted rounded-sm shadow-2xs",
        "hover:border-primary/30 hover:shadow-md transition-all duration-200",
        className
    )

    if (variant === "default") {
        return (
            <Link href={props.href} className={cardClassName}>
                {cardContent}
            </Link>
        )
    }

    return (
        <div className={cardClassName}>
            {cardContent}
        </div>
    )
}

type ListingCardHeaderProps = {
    listing: TGroupedListing
    contractAddress: string
    showArrow?: boolean
}

function ListingCardHeader({ listing, contractAddress, showArrow }: ListingCardHeaderProps) {
    return (
        <div className="flex items-end justify-between">
            <div className='flex flex-col gap-1'>
                <h1 className='font-mono leading-snug text-accent-foreground flex items-center gap-1.5'>
                    <span>{listing.assetName}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-sm text-muted-foreground">
                        {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
                    </span>
                </h1>
                <p className="text-sm">{listing.assetLocation}</p>
            </div>

            {showArrow && (
                <div className="relative group-hover:text-primary">
                    <Icons.arrowRight className="group-hover:opacity-0 transition-opacity duration-200" />
                    <Icons.chevronRight className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
            )}
        </div>
    )
}

function ListingCardBuyCta({ listing }: { listing: TSingleTokenListing }) {
    return (
        <div className="space-y-6 pt-2 border-t border-border">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">
                        Price {listing.price}
                    </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                    {listing.amount} Amount
                </Badge>
            </div>
            <BuyNowDialog listing={listing}>
                <Button
                    data-debug={`buy-trigger-${listing.listingId}`}
                    className="w-full cursor-pointer hover:scale-105 hover:mt-2"
                    size='lg'
                >
                    Buy Now
                </Button>
            </BuyNowDialog>
        </div>
    )
}

function ListingCardYourListingCta({ listing }: { listing: TSingleTokenListing }) {
    return (
        <div className="space-y-6 pt-2 border-t border-border">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">
                        Price {listing.price}
                    </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                    {listing.amount} Amount
                </Badge>
            </div>
            <div className="flex gap-2">
                <UpdateListingDialog listing={listing} />
                <CancelListingAlert listing={listing} />
            </div>
        </div>
    )
}