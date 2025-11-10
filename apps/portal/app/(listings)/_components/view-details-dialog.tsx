"use client"

import { TMarketplaceListing } from "@/services/type"
import React from "react"
import {
    SmartDialog,
    SmartDialogTrigger,
    SmartDialogContent,
    SmartDialogTitle,
    SmartDialogDescription,
} from "@workspace/ui/components/smart-dialog"
import { Badge } from "@workspace/ui/components/badge"
import { Separator } from "@workspace/ui/components/separator"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import Image from "next/image"

interface ViewDetailsDialogProps {
    listing: TMarketplaceListing
    children: React.ReactNode
}

export function ViewDetailsDialog({
    listing,
    children,
}: ViewDetailsDialogProps) {
    const [open, setOpen] = React.useState(false)
    const isExpired = listing.expiry * 1000 < Date.now()

    const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const truncateAddress = (address: string) => {
        if (!address) return "N/A"
        return `${address.slice(0, 6)}...${address.slice(-4)}`
    }

    return (
        <SmartDialog open={open} onOpenChange={setOpen}>
            <SmartDialogTrigger asChild>
                {children}
            </SmartDialogTrigger>
            <SmartDialogContent className="md:min-w-[70vw] md:max-w-[75vw] h-[85vh] md:h-[80vh] flex flex-col p-0 gap-0">
                <div className="px-4 md:px-6 pt-4 md:pt-6 pb-3 md:pb-4 border-b bg-background z-10 shrink-0">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <SmartDialogTitle className="text-lg md:text-2xl lg:text-3xl line-clamp-2">
                                {listing.assetName}
                            </SmartDialogTitle>
                            <SmartDialogDescription className="text-xs md:text-base mt-1 md:mt-2 line-clamp-1">
                                {listing.name}
                            </SmartDialogDescription>
                        </div>
                        <Badge
                            variant={isExpired ? "destructive" : "default"}
                            className="shrink-0 text-xs mt-1"
                        >
                            {isExpired ? "Expired" : "Active"}
                        </Badge>
                    </div>
                </div>

                <ScrollArea className="flex-1 min-h-0">
                    <div className="px-4 md:px-6 py-4 pb-6">
                        <div className="space-y-6">
                            <div className="relative h-80 w-full overflow-hidden rounded-lg border bg-muted">
                                <Image
                                    src={listing.assetImage}
                                    alt={listing.assetName}
                                    fill
                                    className="object-contain h-full w-full"
                                    priority
                                />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                <div className="space-y-1 p-3 md:p-4 rounded-lg border bg-card">
                                    <p className="text-muted-foreground text-xs md:text-sm">Price</p>
                                    <p className="text-xl md:text-2xl font-bold">{listing.price.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground">STX</p>
                                </div>

                                <div className="space-y-1 p-3 md:p-4 rounded-lg border bg-card">
                                    <p className="text-muted-foreground text-xs md:text-sm">Amount</p>
                                    <p className="text-xl md:text-2xl font-bold">{listing.amount.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground">Tokens</p>
                                </div>

                                <div className="space-y-1 p-3 md:p-4 rounded-lg border bg-card">
                                    <p className="text-muted-foreground text-xs md:text-sm">APR</p>
                                    <p className="text-xl md:text-2xl font-bold">{listing.assetApr}</p>
                                    <p className="text-xs text-muted-foreground">Annual Yield</p>
                                </div>

                                <div className="space-y-1 p-3 md:p-4 rounded-lg border bg-card">
                                    <p className="text-muted-foreground text-xs md:text-sm">Valuation</p>
                                    <p className="text-xl md:text-2xl font-bold">{listing.assetValuation}</p>
                                    <p className="text-xs text-muted-foreground">Total Value</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-3 md:space-y-4">
                                <h3 className="text-base md:text-lg font-semibold">Asset Information</h3>

                                <div className="grid gap-2 md:gap-3">
                                    <div className="p-3 rounded-lg bg-muted/50">
                                        <p className="text-sm font-medium mb-1">Location</p>
                                        <p className="text-sm text-muted-foreground">{listing.assetLocation}</p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-muted/50">
                                        <p className="text-sm font-medium mb-1">Total Tokens</p>
                                        <p className="text-sm text-muted-foreground">{listing.assetTokens}</p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-muted/50">
                                        <p className="text-sm font-medium mb-1">Staking Information</p>
                                        <p className="text-sm text-muted-foreground">{listing.assetStaking}</p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-muted/50">
                                        <p className="text-sm font-medium mb-1">Asset Description</p>
                                        <p className="text-sm text-muted-foreground">{listing.assetDescription}</p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Listing Details */}
                            <div className="space-y-3 md:space-y-4">
                                <h3 className="text-base md:text-lg font-semibold">Listing Details</h3>

                                <div className="grid md:grid-cols-2 gap-2 md:gap-3">
                                    <div className="p-3 rounded-lg bg-muted/50">
                                        <p className="text-sm font-medium mb-1">Listing ID</p>
                                        <p className="text-sm text-muted-foreground">#{listing.listingId}</p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-muted/50">
                                        <p className="text-sm font-medium mb-1">Maker</p>
                                        <p className="text-sm text-muted-foreground font-mono truncate" title={listing.maker}>
                                            {truncateAddress(listing.maker)}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-muted/50">
                                        <p className="text-sm font-medium mb-1">Taker</p>
                                        <p className="text-sm text-muted-foreground font-mono truncate" title={listing.taker || "N/A"}>
                                            {listing.taker ? truncateAddress(listing.taker) : "N/A"}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-muted/50">
                                        <p className="text-sm font-medium mb-1">Expiry</p>
                                        <p className="text-sm text-muted-foreground">
                                            {formatDate(listing.expiry)}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-muted/50 md:col-span-2">
                                        <p className="text-sm font-medium mb-1">Contract</p>
                                        <p className="text-sm text-muted-foreground font-mono break-all">
                                            {listing.contract}
                                        </p>
                                    </div>

                                    {listing.paymentAssetContract && (
                                        <div className="p-3 rounded-lg bg-muted/50 md:col-span-2">
                                            <p className="text-sm font-medium mb-1">Payment Asset Contract</p>
                                            <p className="text-sm text-muted-foreground font-mono break-all">
                                                {listing.paymentAssetContract}
                                            </p>
                                        </div>
                                    )}

                                    <div className="p-3 rounded-lg bg-muted/50 md:col-span-2">
                                        <p className="text-sm font-medium mb-1">Topic</p>
                                        <p className="text-sm text-muted-foreground font-mono break-all">
                                            {listing.topic}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* General Description */}
                            <div className="space-y-2">
                                <h3 className="text-base md:text-lg font-semibold">About this Listing</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {listing.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </SmartDialogContent>
        </SmartDialog>
    )
}
