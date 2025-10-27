"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Button } from "@workspace/ui/components/button"
import { Icons } from "@workspace/ui/components/icons"
import Waitlist from "./waitlist"

export default function WaitlistDialog() {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        size="lg"
                        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 cursor-pointer text-white [&>svg]:h-8 [&>svg]:w-8"
                        aria-label="Join Waitlist"
                    >
                        <Icons.click />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-6/12 max-h-[80vh] overflow-y-auto p-0 border-primary/20">
                    <DialogHeader />
                    <Waitlist className="py-3 lg:py-6" />
                </DialogContent>
            </Dialog>
        </>
    )
}
