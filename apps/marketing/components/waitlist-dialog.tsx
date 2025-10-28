"use client"

import React from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Icons } from "@workspace/ui/components/icons"
import Waitlist from "./waitlist"

export default function WaitlistDialog() {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <button
                        className="group fixed bottom-6 right-6 z-50 rounded-full border border-accent bg-accent p-2 text-sm font-semibold cursor-pointer"
                    >
                        <div
                            className="absolute left-0 top-0 flex h-full w-11 items-center justify-end rounded-full transition-all duration-200 ease-in-out group-hover:w-full bg-primary"
                        >
                            <span className="mr-3 text-white transition-all duration-200 ease-in-out">
                                <Icons.arrowRight size={20} />
                            </span>
                        </div>
                        <span className="relative left-4 z-10 whitespace-nowrap px-8 font-semibold text-accent-foreground transition-all duration-200 ease-in-out group-hover:-left-3 group-hover:text-white uppercase tracking-wider">
                            Join Waitlist
                        </span>
                    </button>


                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0 border-primary/20">
                    <Waitlist size="medium" className="py-4" />
                </DialogContent>
            </Dialog>
        </>
    )
}
