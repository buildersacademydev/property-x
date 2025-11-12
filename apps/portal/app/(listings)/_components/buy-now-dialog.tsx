"use client"

import { fulfillStx } from "@/services/mutation-options"
import { buyListingSchema } from "@/services/schema"
import { TBuyListingSchema, TSingleTokenListing } from "@/services/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@workspace/ui/components/button"
import {
    SmartDialog,
    SmartDialogContent,
    SmartDialogDescription,
    SmartDialogFooter,
    SmartDialogHeader,
    SmartDialogTitle,
    SmartDialogTrigger,
} from "@workspace/ui/components/smart-dialog"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

interface BuyNowDialogProps {
    listing: TSingleTokenListing
    children: React.ReactNode
    disabled?: boolean
}

export function BuyNowDialog({
    listing,
    children,
    disabled,
}: BuyNowDialogProps) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const form = useForm<TBuyListingSchema>({
        resolver: zodResolver(buyListingSchema),
    })

    const buyListingMutation = useMutation({
        ...fulfillStx(),
        onSuccess: () => {
            form.reset()
            setOpen(false)
            router.refresh()
        },
        onError: (error) => {
            toast.error(`Error purchasing listing: ${error.message}`)
        },
    })

    const onSubmit = async (values: TBuyListingSchema) => {
        if (!listing.contract) return toast.error("Missing asset contract")
        if (values.amount > Number(listing.amount)) {
            form.setError("amount", {
                type: "manual",
                message: `Amount cannot exceed the value ${listing.amount}`,
            })
            return
        }
        buyListingMutation.mutate({
            listingId: listing.listingId,
            contract: listing.contract,
            amount: values.amount,
        })
    }

    const watchedAmount = form.watch("amount")
    const totalCost = (watchedAmount || 0) * listing.price

    return (
        <SmartDialog open={open} onOpenChange={setOpen}>
            <SmartDialogTrigger asChild disabled={disabled}>
                {children}
            </SmartDialogTrigger>

            <SmartDialogContent>
                <SmartDialogHeader>
                    <SmartDialogTitle>Buy {listing.assetName}</SmartDialogTitle>
                    <SmartDialogDescription>
                        Enter the amount of tokens you want to purchase. Current price:{" "}
                        {listing.price} tokens each.
                    </SmartDialogDescription>
                </SmartDialogHeader>
                <div className="px-4 mt-4">
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="amount"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}
                                        className="max-w-md mx-auto"

                                    >
                                        <FieldLabel htmlFor={field.name}>Amount</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            type="number"
                                            placeholder="Enter amount"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            {totalCost > 0 && (
                                <div className="rounded-lg bg-muted p-3">
                                    <div className="flex justify-between text-sm">
                                        <span>Total Cost:</span>
                                        <span className="font-semibold">{totalCost} tokens</span>
                                    </div>
                                </div>
                            )}

                            <SmartDialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                    disabled={buyListingMutation.isPending}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" loading={buyListingMutation.isPending}>
                                    Buy Now
                                </Button>
                            </SmartDialogFooter>
                        </FieldGroup>
                    </form>
                </div>

            </SmartDialogContent>
        </SmartDialog>
    )
}
