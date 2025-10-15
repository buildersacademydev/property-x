"use client"

import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import { Icons } from "@workspace/ui/components/icons"
import Link from "next/link"
import * as React from "react"

const EmptyApt: React.FC = () => {
    return (
        <div className="flex w-full items-center justify-center py-24">
            <Card
                className="mx-auto flex w-full max-w-xl flex-col items-center gap-6
          rounded-xl border border-dashed p-10 text-center"
            >
                <div
                    className="flex h-20 w-20 items-center justify-center rounded-full
            bg-accent/40"
                >
                    <Icons.building className="text-muted-foreground" size={40} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight">No APTs yet</h2>
                    <p className="mx-auto max-w-sm text-sm text-muted-foreground">
                        You don&apos;t own any tokenized properties yet. Acquire fractional
                        real estate tokens to start earning passive yield.
                    </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <Button className="w-full" asChild>
                        <Link href="/explore" className="flex-1">
                            Explore Properties
                        </Link>
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default EmptyApt