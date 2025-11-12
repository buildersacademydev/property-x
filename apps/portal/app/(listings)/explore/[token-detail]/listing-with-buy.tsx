'use client'

import { ListingCard } from '../../_components/listing-card'
import { TGroupedListing } from '@/services/type'

interface ListingWithBuyProps {
    listing: TGroupedListing
    listingId: number
    price: number
    amount: number
    maker: string
    expiry: number
}

export function ListingWithBuy({
    listing,
    listingId,
    price,
    amount,
    maker,
    expiry,
}: ListingWithBuyProps) {
    const handleBuyClick = () => {
        console.log('Buy listing:', listingId)
        // TODO: Implement buy functionality
        // This could open a dialog, trigger a wallet transaction, etc.
    }

    return (
        <ListingCard
            variant="buy-now"
            listing={listing}
            listingId={listingId}
            price={price}
            amount={amount}
            maker={maker}
            expiry={expiry}
            onBuyClick={handleBuyClick}
        />
    )
}
