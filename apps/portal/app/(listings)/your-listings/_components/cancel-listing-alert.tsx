"use client"

import { cancelListing } from "@/services/mutation-options"
import { TMarketplaceListing, TSingleTokenListing } from "@/services/type"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useState } from "react"
import {
    SmartDialog,
    SmartDialogContent,
    SmartDialogDescription,
    SmartDialogFooter,
    SmartDialogHeader,
    SmartDialogTitle,
    SmartDialogTrigger,
} from "@workspace/ui/components/smart-dialog"
import { Button } from "@workspace/ui/components/button"

interface CancelListingAlertProps {
    listing: TSingleTokenListing
}

export function CancelListingAlert({ listing }: CancelListingAlertProps) {
    const [open, setOpen] = useState(false)

    const mutation = useMutation({
        ...cancelListing(),
        onSuccess: () => {
            setOpen(false)
        },
        onError: (error: any) => {
            toast.error(`Error cancelling listing: ${error.message}`)
        },
    })

    function onConfirm() {
        mutation.mutate({
            listingId: listing.listingId,
            contract: listing.contract,
        })
    }

    return (
        <SmartDialog open={open} onOpenChange={setOpen}>
            <SmartDialogTrigger asChild>
                <Button className="flex-1" variant="destructive">
                    Cancel Listing
                </Button>
            </SmartDialogTrigger>
            <SmartDialogContent>
                <SmartDialogHeader>
                    <SmartDialogTitle>Cancel Listing</SmartDialogTitle>
                    <SmartDialogDescription>
                        Are you sure you want to cancel this listing? This action cannot be
                        undone.
                    </SmartDialogDescription>
                </SmartDialogHeader>
                <SmartDialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={mutation.status === "pending"}
                    >
                        Close
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={onConfirm}
                        loading={mutation.isPending}
                    >
                        Confirm
                    </Button>
                </SmartDialogFooter>
            </SmartDialogContent>
        </SmartDialog>
    )
}
