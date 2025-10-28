"use client"

import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@workspace/ui/components/field"
import { Icons } from "@workspace/ui/components/icons"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"

const waitlistSchema = z.object({
    email: z
        .email("Please enter a valid email address")
        .min(1, "Email is required"),
    walletAddress: z
        .string()
        .min(1, "Wallet address is required")
})

type WaitlistFormData = z.infer<typeof waitlistSchema>

const waitlistVariants = cva("relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background", {
    variants: {
        size: {
            default: "py-20 lg:py-28",
            medium: "py-12 lg:py-16",
        },
    },
    defaultVariants: {
        size: "default",
    },
})

const headingVariants = cva("mb-6 leading-tight font-bold tracking-tight text-balance", {
    variants: {
        size: {
            default: "text-4xl lg:text-5xl",
            medium: "text-2xl lg:text-3xl",
        },
    },
    defaultVariants: {
        size: "default",
    },
})

const descriptionVariants = cva("mx-auto max-w-2xl text-muted-foreground text-balance", {
    variants: {
        size: {
            default: "text-xl",
            medium: "text-base",
        },
    },
    defaultVariants: {
        size: "default",
    },
})

const badgeVariants = cva("border-primary/30 bg-primary/10 font-semibold text-primary backdrop-blur-sm", {
    variants: {
        size: {
            default: "mb-6 px-4 py-2 text-sm",
            medium: "mb-4 px-3 py-1.5 text-xs",
        },
    },
    defaultVariants: {
        size: "default",
    },
})

const cardPaddingVariants = cva("", {
    variants: {
        size: {
            default: "pt-8 pb-8",
            medium: "pt-6 pb-6",
        },
    },
    defaultVariants: {
        size: "default",
    },
})

const inputVariants = cva("bg-background/60 border-border/50 focus:border-primary/50 focus:bg-background/80 transition-all duration-200", {
    variants: {
        size: {
            default: "h-14 text-base pl-12",
            medium: "h-11 text-sm pl-10",
        },
    },
    defaultVariants: {
        size: "default",
    },
})

const iconVariants = cva("absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground", {
    variants: {
        size: {
            default: "w-5 h-5",
            medium: "w-4 h-4",
        },
    },
    defaultVariants: {
        size: "default",
    },
})

const buttonVariants = cva("w-full cursor-pointer max-w-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold", {
    variants: {
        size: {
            default: "px-12 h-14 text-lg mt-4",
            medium: "px-8 h-11 text-base mt-3",
        },
    },
    defaultVariants: {
        size: "default",
    },
})

const labelVariants = cva("font-medium text-foreground", {
    variants: {
        size: {
            default: "text-base",
            medium: "text-sm",
        },
    },
    defaultVariants: {
        size: "default",
    },
})

const containerVariants = cva("mx-auto", {
    variants: {
        size: {
            default: "max-w-4xl",
            medium: "max-w-6xl w-full",
        },
    },
    defaultVariants: {
        size: "default",
    },
})

interface WaitlistProps extends VariantProps<typeof waitlistVariants> {
    className?: string
}

export default function Waitlist({ className, size }: WaitlistProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const form = useForm<WaitlistFormData>({
        resolver: zodResolver(waitlistSchema),
        defaultValues: {
            email: "",
            walletAddress: "",
        },
    })

    const onSubmit = async (data: WaitlistFormData) => {
        setIsSubmitting(true)

        try {
            const response = await fetch("/api/waitlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                if (response.status === 409) {
                    form.setError("email", {
                        type: "manual",
                        message: "This email is already on the waitlist!",
                    })
                    return
                }
                throw new Error(result.message || "Failed to join waitlist")
            }

            console.log("Waitlist submission successful:", result)
            setIsSubmitted(true)
            form.reset()
        } catch (error) {
            console.error("Error submitting waitlist:", error)
            form.setError("root", {
                type: "manual",
                message: error instanceof Error ? error.message : "Failed to submit. Please try again.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section
            id="waitlist"
            className={cn(waitlistVariants({ size }), className)}
        >
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute top-1/2 left-1/2 h-[600px] w-[600px]
                    -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20
                    blur-3xl opacity-40"
                />
                <div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5
                    via-background to-secondary/5 opacity-60"
                />
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: "40px 40px",
                        WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, #000 40%, transparent 100%)",
                        maskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, #000 40%, transparent 100%)",
                    }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-4">
                <div className={cn(containerVariants({ size }))}>
                    <div className="mb-12 text-center">
                        <Badge
                            variant="outline"
                            className={cn(badgeVariants({ size }))}
                        >
                            <Icons.zap />
                            Early Access
                        </Badge>

                        <h2
                            className={cn(headingVariants({ size }))}
                        >
                            {isSubmitted ? (
                                <>
                                    You're In!
                                    <span className="bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">
                                        {" "}Welcome to PropertyX
                                    </span>
                                </>
                            ) : (
                                <>
                                    Join the
                                    <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                        {" "}Future of Real Estate
                                    </span>
                                </>
                            )}
                        </h2>

                        <p className={cn(descriptionVariants({ size }))}>
                            {isSubmitted ? (
                                "Thanks for joining our waitlist! We'll notify you as soon as PropertyX launches with exclusive early access benefits."
                            ) : (
                                "Be among the first to access tokenized real estate with transparent yields. Secure your spot for exclusive launch benefits and priority access."
                            )}
                        </p>
                    </div>

                    {isSubmitted && (
                        <div className={cn(containerVariants({ size }))}>
                            <Card className="border border-green-500/30 bg-gradient-to-br from-green-500/10 to-background/60 backdrop-blur-xl shadow-xl">
                                <CardContent className={cn(cardPaddingVariants({ size }))}>
                                    <div className="text-center space-y-6">
                                        <div className="flex justify-center">
                                            <div className="rounded-full bg-green-500/20 p-4">
                                                <Icons.checkCircle className="w-8 h-8 text-green-500" />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div className="flex items-center justify-center space-x-2 text-green-500">
                                                    <Icons.checkCircle className="w-4 h-4" />
                                                    <span>Priority access secured</span>
                                                </div>
                                                <div className="flex items-center justify-center space-x-2 text-green-500">
                                                    <Icons.checkCircle className="w-4 h-4" />
                                                    <span>Launch bonuses reserved</span>
                                                </div>
                                                <div className="flex items-center justify-center space-x-2 text-green-500">
                                                    <Icons.checkCircle className="w-4 h-4" />
                                                    <span>Updates coming soon</span>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            variant="outline"
                                            onClick={() => setIsSubmitted(false)}
                                            className="border-green-500/30 text-green-500 hover:bg-green-500/10"
                                        >
                                            Join Another Wallet
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {!isSubmitted && (
                        <div className={cn(containerVariants({ size }))}>
                            <Card className="border border-primary/20 bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-xl shadow-xl">
                                <CardContent className={cn(cardPaddingVariants({ size }))}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <FieldGroup className="space-y-8">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                <Controller
                                                    name="email"
                                                    control={form.control}
                                                    render={({ field, fieldState }) => (
                                                        <Field data-invalid={fieldState.invalid} className="space-y-3">
                                                            <FieldLabel htmlFor={field.name} className={cn(labelVariants({ size }))}>
                                                                Email Address
                                                            </FieldLabel>
                                                            <div className="relative">
                                                                <Icons.mail className={cn(iconVariants({ size }))} />
                                                                <Input
                                                                    {...field}
                                                                    id={field.name}
                                                                    type="email"
                                                                    placeholder="your@email.com"
                                                                    className={cn(inputVariants({ size }))}
                                                                    disabled={isSubmitting}
                                                                    aria-invalid={fieldState.invalid}
                                                                />
                                                            </div>
                                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-sm" />}
                                                        </Field>
                                                    )}
                                                />

                                                <Controller
                                                    name="walletAddress"
                                                    control={form.control}
                                                    render={({ field, fieldState }) => (
                                                        <Field data-invalid={fieldState.invalid} className="space-y-3">
                                                            <FieldLabel htmlFor={field.name} className={cn(labelVariants({ size }))}>
                                                                Wallet Address
                                                            </FieldLabel>
                                                            <div className="relative">
                                                                <Icons.wallet className={cn(iconVariants({ size }))} />
                                                                <Input
                                                                    {...field}
                                                                    id={field.name}
                                                                    placeholder="binaya.btc"
                                                                    className={cn(inputVariants({ size }))}
                                                                    disabled={isSubmitting}
                                                                    aria-invalid={fieldState.invalid}
                                                                />
                                                            </div>
                                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-sm" />}
                                                        </Field>
                                                    )}
                                                />
                                            </div>

                                            {form.formState.errors.root && (
                                                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center">
                                                    <p className="text-sm text-red-500">
                                                        {form.formState.errors.root.message}
                                                    </p>
                                                </div>
                                            )}

                                            <div className="flex justify-center">
                                                <Button
                                                    type="submit"
                                                    size="sm"
                                                    className={cn(buttonVariants({ size }))}
                                                    disabled={isSubmitting}
                                                    loading={isSubmitting}
                                                >
                                                    <Icons.click size={size === "medium" ? 20 : 24} />
                                                    <span>
                                                        Secure Your Spot
                                                    </span>
                                                </Button>
                                            </div>
                                        </FieldGroup>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}