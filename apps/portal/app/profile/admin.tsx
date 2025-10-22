"use client"

import { whitelistContract } from "@/services/mutation-options"
import { marketplaceSchema, whitelistContractSchema } from "@/services/schema"
import { TMarketplaceSchema, TWhitelistContractSchema } from "@/services/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import React from "react"
import { Button } from "@workspace/ui/components/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@workspace/ui/components/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group"

const Admin = () => {
    const whitelistForm = useForm<TWhitelistContractSchema>({
        resolver: zodResolver(whitelistContractSchema),
        defaultValues: { whitelisted: "", isWhitelisted: true },
        mode: "onChange",
    })

    const marketplaceForm = useForm<TMarketplaceSchema>({
        resolver: zodResolver(marketplaceSchema),
        defaultValues: { principal: "", role: "admin" },
        mode: "onChange",
    })

    const whitelistMutation = useMutation({
        ...whitelistContract(),
        onSuccess: () => {
            whitelistForm.reset()
        },
        onError: (error) => {
            toast.error(`Error updating whitelist status: ${error.message}`)
        },
    })

    const onSubmitWhitelist = async (values: TWhitelistContractSchema) => {
        whitelistMutation.mutate({
            whitelisted: values.whitelisted,
            isWhitelisted: values.isWhitelisted,
        })
    }

    const onSubmitMarketplace = (values: TMarketplaceSchema) => {
        console.log("Marketplace update submit", values)
    }

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">
                        Whitelist Token Contract
                    </CardTitle>
                    <CardDescription>
                        Make the given contract address whitelist for the PropertyX
                        ecosystem
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                    <form
                        onSubmit={whitelistForm.handleSubmit(onSubmitWhitelist)}
                    >
                        <FieldGroup>
                            <Controller
                                name="whitelisted"
                                control={whitelistForm.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Contract Address</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            placeholder="Enter contract address"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="isWhitelisted"
                                control={whitelistForm.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="isWhitelisted">Is Whitelisted</FieldLabel>
                                        <RadioGroup
                                            name={field.name}
                                            value={field.value.toString()}
                                            onValueChange={(val) => field.onChange(val === "true")}
                                            className="grid grid-cols-2 gap-3"
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <label
                                                className="inline-flex items-center gap-2 text-sm"
                                            >
                                                <RadioGroupItem value="true" /> True
                                            </label>
                                            <label
                                                className="inline-flex items-center gap-2 text-sm"
                                            >
                                                <RadioGroupItem value="false" /> False
                                            </label>
                                        </RadioGroup>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <div className="flex justify-end">
                                <Button type="submit" loading={whitelistMutation.isPending}>
                                    Submit
                                </Button>
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

            {/* Update Marketplace Contract */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">
                        Update Marketplace Contract
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <form
                        onSubmit={marketplaceForm.handleSubmit(onSubmitMarketplace)}
                    >
                        <FieldGroup>
                            <Controller
                                name="principal"
                                control={marketplaceForm.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Principal</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            placeholder="Enter principal address"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="role"
                                control={marketplaceForm.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="role">Role</FieldLabel>
                                        <RadioGroup
                                            name={field.name}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className="grid grid-cols-2 gap-3"
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <label
                                                className="inline-flex items-center gap-2 text-sm"
                                            >
                                                <RadioGroupItem value="admin" /> Admin
                                            </label>
                                            <label
                                                className="inline-flex items-center gap-2 text-sm"
                                            >
                                                <RadioGroupItem value="fulfill" /> Fulfill
                                            </label>
                                        </RadioGroup>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <div className="flex justify-end">
                                <Button type="submit">Update</Button>
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Admin
