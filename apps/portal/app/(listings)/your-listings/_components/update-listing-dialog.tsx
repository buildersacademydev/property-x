"use client"

import { updateListing } from "@/services/mutation-options"
import { updateListingSchema } from "@/services/schema"
import { TSingleTokenListing, TUpdateListingSchema } from "@/services/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useMemo, useState } from "react"
import { useBlockHeight } from "@/hooks/use-block-height"
import { Button } from "@workspace/ui/components/button"
import {
    SmartDialog,
    SmartDialogContent,
    SmartDialogDescription,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select"

interface UpdateListingDialogProps {
    listing: TSingleTokenListing
}

export function UpdateListingDialog({ listing }: UpdateListingDialogProps) {
    const [open, setOpen] = useState(false)
    const { currentBlockHeight, isSuccessBlockHeight } = useBlockHeight()

    const form = useForm<TUpdateListingSchema>({
        resolver: zodResolver(updateListingSchema) as any,
        defaultValues: {
            price: listing.price,
            amount: listing.amount,
            expiry: "20927",
        },
    })

    const initialValues = useMemo(
        () => ({
            price: listing.price,
            amount: listing.amount,
            expiry: String(listing.expiry),
        }),
        [listing.price, listing.amount, listing.expiry]
    )

    const mutation = useMutation({
        ...updateListing(),
        onSuccess: () => {
            setOpen(false)
        },
        onError: (error: any) => {
            toast.error(`Error updating listing: ${error.message}`)
        },
    })

    function onSubmit(values: TUpdateListingSchema) {
        const hasChanges =
            Number(values.price) !== Number(initialValues.price) ||
            Number(values.amount) !== Number(initialValues.amount) ||
            String(values.expiry) !== String(initialValues.expiry)

        if (!hasChanges) {
            toast.error("No changes made to update")
            return
        }
        if (!isSuccessBlockHeight || !currentBlockHeight) {
            return toast.error("Unable to fetch current block height")
        }
        mutation.mutate({
            currentBlockHeight,
            listingId: listing.listingId,
            contract: listing.contract,
            ...values,
        })
    }

    return (
        <SmartDialog open={open} onOpenChange={setOpen}>
            <SmartDialogTrigger asChild>
                <Button className="flex-1" variant="secondary">
                    Update Listing
                </Button>
            </SmartDialogTrigger>
            <SmartDialogContent>
                <SmartDialogHeader>
                    <SmartDialogTitle>Update Listing</SmartDialogTitle>
                    <SmartDialogDescription>
                        Modify the selected fields to update your listing.
                    </SmartDialogDescription>
                </SmartDialogHeader>
                <div className="px-4 mt-4">
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="price"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            type="number"
                                            placeholder="Enter price"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="amount"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
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

                            <Controller
                                name="expiry"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="expiry">Expiry</FieldLabel>
                                        <Select
                                            name={field.name}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger
                                                id="expiry"
                                                className="w-full"
                                                aria-invalid={fieldState.invalid}
                                            >
                                                <SelectValue placeholder="Select a duration" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="20927">7 Days</SelectItem>
                                                <SelectItem value="41855">14 Days</SelectItem>
                                                <SelectItem value="89689">30 Days</SelectItem>
                                                <SelectItem value="179377">60 Days</SelectItem>
                                                <SelectItem value="269066">90 Days</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <div className="flex gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setOpen(false)}
                                    disabled={mutation.status === "pending"}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={mutation.status === "pending"}
                                >
                                    {mutation.status === "pending" ? "Updating..." : "Update"}
                                </Button>
                            </div>
                        </FieldGroup>
                    </form>
                </div>
            </SmartDialogContent>
        </SmartDialog>
    )
}
