import React from 'react'
import { Badge } from "@workspace/ui/components/badge"
import { Icons } from "@workspace/ui/components/icons"
import Waitlist from "./waitlist"

const ComingSoon = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
            <section className="relative overflow-hidden pt-20 lg:pt-32">
                <div className="relative z-10 container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <Badge
                            variant="outline"
                            className="mb-8 border-primary/30 bg-primary/10 px-6 py-3 text-base
                            font-semibold text-primary backdrop-blur-sm animate-pulse"
                        >
                            <Icons.clock className="mr-2 h-5 w-5" />
                            Coming Soon
                        </Badge>

                        <h1
                            className="mb-6 text-5xl leading-tight font-bold tracking-tight
                            text-balance lg:text-7xl"
                        >
                            We're Building
                            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Something Amazing
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mx-auto max-w-2xl text-xl lg:text-2xl text-muted-foreground text-balance mb-12">
                            This page is currently under development. Join our waitlist to be
                            the first to know when we launch!
                        </p>
                    </div>
                </div>
            </section>
            <Waitlist />
        </div>
    )
}

export default ComingSoon