'use client'

import React from 'react'
import { Icons } from '@workspace/ui/components/icons'
import { Ghost } from 'lucide-react'

const NotFound = () => {
    const HomeLink = 'a';

    return (
        <div className="relative flex h-full w-full items-center py-20 justify-center overflow-hidden bg-background">
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <Icons.logoPropertyX className="w-[600px] h-[700px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center max-w-2xl">
                <div className="flex items-center justify-center gap-6 md:gap-8">
                    <span className="text-[100px] md:text-[140px] font-bold text-secondary select-none">
                        4
                    </span>
                    <Ghost className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] text-secondary" strokeWidth={1.5} />
                    <span className="text-[100px] md:text-[140px] font-bold text-secondary select-none">
                        4
                    </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    Looks like this page got lost between blocks.
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mb-4">
                    Probably waiting for validators to notice it, or it just ghosted entirely.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <HomeLink
                        href="/"
                        className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105"
                    >
                        <Icons.home className="w-5 h-5 transition-transform group-hover:scale-110" />
                        Return Home
                    </HomeLink>
                </div>
            </div>
        </div>
    )
}

export default NotFound