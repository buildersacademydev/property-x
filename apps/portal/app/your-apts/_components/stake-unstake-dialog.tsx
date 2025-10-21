"use client"

import { stakeApt, unstakeApt } from "@/services/mutation-options"
import { stakeSchema, unstakeSchema } from "@/services/schema"
import {
    TStakeApt,
    TStakeAptSchema,
    TUnstakeApt,
    TUnstakeAptSchema,
} from "@/services/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useBlockHeight } from "@/hooks/use-block-height"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { Button } from "@workspace/ui/components/button"
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

type Variant = "stake" | "unstake"

interface Props {
    contract: string
    balance: number
    variant: Variant
}

export function StakeUnstakeDialog({ contract, balance, variant }: Props) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const { currentBlockHeight, isSuccessBlockHeight } = useBlockHeight()

    const isStake = variant === "stake"

    const form = useForm<TStakeAptSchema | TUnstakeAptSchema>({
        resolver: zodResolver(
            isStake ? stakeSchema : unstakeSchema
        ) as any,
        defaultValues: isStake
            ? { amount: undefined, expiry: undefined }
            : { amount: undefined },
    })

    const stakeMutation = useMutation({
        ...stakeApt(),
        onSuccess: () => {
            form.reset()
            setOpen(false)
            router.refresh()
        },
        onError: (error: any) => {
            toast.error(error?.message || "Failed to stake APT")
        },
    })

    const unstakeMutation = useMutation({
        ...unstakeApt(),
        onSuccess: () => {
            form.reset()
            setOpen(false)
            router.refresh()
        },
        onError: (error: any) => {
            toast.error(error?.message || "Failed to unstake APT")
        },
    })

    function onSubmit(values: TStakeAptSchema | TUnstakeAptSchema) {
        if (!contract) return toast.error("Missing contract address")
        if (!isSuccessBlockHeight || !currentBlockHeight) {
            return toast.error("Unable to fetch current block height")
        }

        if (values.amount > Number(balance)) {
            form.setError("amount" as any, {
                type: "manual",
                message: `Amount cannot exceed the value ${balance}`,
            })
            return
        }

        if (isStake && "expiry" in values) {
            const payload: TStakeApt = {
                contract,
                currentBlockHeight,
                amount: Number(values.amount),
                expiry: values.expiry,
            }
            stakeMutation.mutate(payload)
        } else {
            const payload: TUnstakeApt = {
                contract,
                amount: Number(values.amount),
            }
            unstakeMutation.mutate(payload)
        }
    }

    const submitting = isStake
        ? stakeMutation.isPending
        : unstakeMutation.isPending

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button className="flex-1" variant={"outline"}>
                    {isStake ? "Stake APT" : "Unstake APT"}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {isStake ? "Stake APT" : "Unstake APT"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {isStake
                            ? "Lock your APT tokens for yield until the chosen expiry block."
                            : "Withdraw previously staked APT tokens."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="pt-2"
                >
                    <FieldGroup>
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
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {isStake && (
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
                        )}

                        <AlertDialogFooter className="pt-2">
                            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button type="submit" loading={submitting} className="min-w-28">
                                    {isStake ? "Stake" : "Unstake"}
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </FieldGroup>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}
