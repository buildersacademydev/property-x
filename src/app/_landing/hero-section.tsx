"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api"
import { Separator } from "@/components/ui/separator"
import ConnectWallet from "@/components/common/connect-wallet"
import { Icons } from "@/components/common/icons"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative -mt-12 min-h-screen w-full overflow-hidden
        bg-background"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0
            bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_60%)]"
        />
        <div
          className="absolute top-0 left-1/2 h-64 w-[120%] -translate-x-1/2
            bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5
            opacity-60 blur-3xl"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, #000 40%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />

      <div
        className="relative z-20 container mx-auto px-4 pt-36 pb-24 md:pt-40
          md:pb-28"
      >
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center text-center">
            <div
              className="animate-in space-y-8 duration-1000
                slide-in-from-bottom-8"
            >
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="animate-in text-sm font-medium delay-300
                    duration-1000 fade-in"
                >
                  <Icons.bitcoin className="mr-2 h-4 w-4" />
                  Bitcoin-Secured Real Estate
                </Badge>

                <h1
                  className="animate-in text-[clamp(2.4rem,6vw,3.75rem)]
                    leading-[1.05] font-bold tracking-tight text-balance
                    delay-500 duration-1000 slide-in-from-bottom-6"
                >
                  The First
                  <span className="text-primary">
                    {" "}
                    Real Yield RWA Protocol
                  </span>{" "}
                  on Stacks
                </h1>

                <p
                  className="mx-auto max-w-2xl animate-in
                    text-[clamp(1.05rem,1.3vw,1.25rem)] leading-relaxed
                    text-pretty text-foreground/90 delay-500 duration-1000
                    slide-in-from-bottom-4"
                >
                  Tokenize real business cash flows — not hype. Earn
                  sustainable, transparent yield secured by Bitcoin through
                  Stacks&apos; programmability and Bitcoin-grade security.
                </p>
              </div>

              <div
                className="flex animate-in flex-wrap justify-center gap-2
                  text-sm text-muted-foreground delay-900 duration-1000 fade-in"
              >
                <div className="flex items-center gap-1">
                  <Icons.shield className="h-4 w-4" />
                  Built on Stacks, secured by Bitcoin
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1">
                  <Icons.checkCircle className="h-4 w-4" />
                  Clarity smart contracts
                </div>
              </div>

              <div
                className="flex animate-in justify-center delay-1100
                  duration-1000 slide-in-from-bottom-2"
              >
                <ConnectWallet
                  size={"lg"}
                  className="px-10 py-6 text-lg font-medium transition-all
                    duration-300 hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 w-full rounded-xl bg-accent/20 p-4">
            <DatabaseWithRestApi />
          </div>
        </div>
      </div>
    </section>
  )
}
