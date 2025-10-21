"use client"

import { listAptForSale } from "@/services/mutation-options"
import { listForSaleSchema } from "@/services/schema"
import { TListForSaleSchema } from "@/services/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useBlockHeight } from "@/hooks/use-block-height"
import { Button } from "@workspace/ui/components/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@workspace/ui/components/dialog"
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

type Props = {
    contract: string
    balance: number
}

export function ListForSaleDialog({ contract, balance }: Props) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const { currentBlockHeight, isSuccessBlockHeight } = useBlockHeight()

    const form = useForm<TListForSaleSchema>({
        resolver: zodResolver(listForSaleSchema),
        defaultValues: {
            paymentAsset: "STX",
            listingDuration: "20927",
            targetBuyer: "",
        },
    })

    const listAptMutation = useMutation({
        ...listAptForSale(),
        onSuccess: () => {
            form.reset()
            setOpen(false)
            router.refresh()
        },
        onError: (error) => {
            toast.error(`Error listing apt for sale: ${error.message}`)
        },
    })

    async function onSubmit(values: TListForSaleSchema) {
        if (!contract) return toast.error("Missing asset contract")
        if (values.amount > Number(balance)) {
            form.setError("amount", {
                type: "manual",
                message: `Amount cannot exceed the value ${balance}`,
            })
            return
        }
        if (!isSuccessBlockHeight || !currentBlockHeight) {
            toast.error("Unable to fetch current block height")
            return
        }
        listAptMutation.mutate({
            currentBlockHeight,
            ...values,
            contract,
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex-1">List for Sale</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>List for Sale</DialogTitle>
                    <DialogDescription>
                        Set your listing details and publish.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="listingPrice"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Listing Price</FieldLabel>
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

                        <Field>
                            <FieldLabel>FT Asset Contract Address</FieldLabel>
                            <Input
                                className="bg-muted text-muted-foreground"
                                type="text"
                                disabled
                                value={contract}
                                readOnly
                            />
                        </Field>

                        <Controller
                            name="paymentAsset"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="payment-asset">Payment Asset</FieldLabel>
                                    <Select
                                        name={field.name}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger
                                            id="payment-asset"
                                            className="w-full"
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <SelectValue placeholder="Select payment asset" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="STX">STX</SelectItem>
                                            <SelectItem value="SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token">
                                                SBTC
                                            </SelectItem>
                                            <SelectItem value="SPN5AKG35QZSK2M8GAMR4AFX45659RJHDW353HSG.usdh-token-v1">
                                                USDC
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="listingDuration"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="listing-duration">Listing Duration</FieldLabel>
                                    <Select
                                        name={field.name}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger
                                            id="listing-duration"
                                            className="w-full"
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <SelectValue placeholder="Select duration" />
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

                        <Controller
                            name="targetBuyer"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Target Buyer (optional)</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        placeholder="Stacks address"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <div className="flex gap-3 pt-2">
                            <Button
                                type="submit"
                                className="flex-1"
                                loading={listAptMutation.isPending}
                            >
                                List Apt
                            </Button>
                        </div>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    )
}
