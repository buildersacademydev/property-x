"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form"
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
        .regex(
            /^(SP|SM)[0-9A-Z]{39}$|^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^0x[a-fA-F0-9]{40}$/,
            "Please enter a valid wallet address (Stacks, Bitcoin, or Ethereum)"
        ),
})

type WaitlistFormData = z.infer<typeof waitlistSchema>

interface WaitlistProps {
    className?: string
}

export default function Waitlist({ className }: WaitlistProps) {
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
            // Simulate API call - replace with actual endpoint
            await new Promise(resolve => setTimeout(resolve, 2000))

            console.log("Waitlist submission:", data)
            setIsSubmitted(true)
            form.reset()
        } catch (error) {
            console.error("Error submitting waitlist:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section
            id="waitlist"
            className={cn("relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-background via-muted/30 to-background", className)}
        >
            {/* Background Elements */}
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
                <div className="mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <Badge
                            variant="outline"
                            className="mb-6 border-primary/30 bg-primary/10 px-4 py-2 text-sm
                            font-semibold text-primary backdrop-blur-sm"
                        >
                            <Icons.zap className="mr-2 h-4 w-4" />
                            Early Access
                        </Badge>

                        <h2
                            className="mb-6 text-4xl leading-tight font-bold tracking-tight
                            text-balance lg:text-5xl"
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

                        <p className="mx-auto max-w-2xl text-xl text-muted-foreground text-balance">
                            {isSubmitted ? (
                                "Thanks for joining our waitlist! We'll notify you as soon as PropertyX launches with exclusive early access benefits."
                            ) : (
                                "Be among the first to access tokenized real estate with transparent yields. Secure your spot for exclusive launch benefits and priority access."
                            )}
                        </p>
                    </div>

                    {/* Success State */}
                    {isSubmitted && (
                        <div className="mx-auto max-w-4xl">
                            <Card className="border border-green-500/30 bg-gradient-to-br from-green-500/10 to-background/60 backdrop-blur-xl shadow-xl">
                                <CardContent className="pt-8 pb-8">
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

                    {/* Form State */}
                    {!isSubmitted && (
                        <div className="mx-auto max-w-4xl">
                            <Card className="border border-primary/20 bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-xl shadow-xl">
                                <CardContent className="pt-8 pb-8">
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-3">
                                                            <FormLabel className="text-base font-medium text-foreground">
                                                                Email Address
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Icons.mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                                    <Input
                                                                        {...field}
                                                                        type="email"
                                                                        placeholder="your@email.com"
                                                                        className="pl-12 h-14 text-base bg-background/60 border-border/50 focus:border-primary/50 focus:bg-background/80 transition-all duration-200"
                                                                        disabled={isSubmitting}
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage className="text-sm" />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="walletAddress"
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-3">
                                                            <FormLabel className="text-base font-medium text-foreground">
                                                                Wallet Address
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Icons.wallet className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="SP...."
                                                                        className="pl-12 h-14 text-base bg-background/60 border-border/50 focus:border-primary/50 focus:bg-background/80 transition-all duration-200"
                                                                        disabled={isSubmitting}
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage className="text-sm" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="flex justify-center">
                                                <Button
                                                    type="submit"
                                                    size="sm"
                                                    className="px-12 h-14 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold w-full cursor-pointer max-w-2xl mt-4"
                                                    disabled={isSubmitting}
                                                    loading={isSubmitting}
                                                >
                                                    <Icons.click size={24} />
                                                    <span>
                                                        Secure Your Spot
                                                    </span>
                                                </Button>
                                            </div>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}