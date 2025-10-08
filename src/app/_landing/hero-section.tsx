"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import ConnectWallet from "@/components/common/connect-wallet"
import { Icons } from "@/components/common/icons"

export function HeroSection() {
  const [trancheSold, setTrancheSold] = useState(3420)
  const [animatedProgress, setAnimatedProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress((trancheSold / 10000) * 100)
    }, 1000)
    return () => clearTimeout(timer)
  }, [trancheSold])

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0
            bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_60%)]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-background
            via-background/80 to-background"
        />
        <div
          className="absolute top-0 left-1/2 h-64 w-[120%] -translate-x-1/2
            bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10
            opacity-60 blur-3xl"
        />
      </div>
      <div
        className="relative z-10 container mx-auto px-4 pt-36 pb-24 md:pt-40
          md:pb-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div
              className="animate-in space-y-8 duration-1000
                slide-in-from-left-8"
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
                    delay-500 duration-1000 slide-in-from-left-6"
                >
                  The First
                  <span className="text-primary">
                    {" "}
                    Real Yield RWA Protocol
                  </span>{" "}
                  on Stacks
                </h1>

                <p
                  className="max-w-xl animate-in
                    text-[clamp(1.05rem,1.3vw,1.25rem)] leading-relaxed
                    text-pretty text-foreground/90 delay-700 duration-1000
                    slide-in-from-left-4"
                >
                  Tokenize real business cash flows — not hype. Earn
                  sustainable, transparent yield secured by Bitcoin through
                  Stacks&apos; programmability and Bitcoin-grade security.
                </p>
              </div>

              <div
                className="flex animate-in flex-wrap gap-2 text-sm
                  text-muted-foreground delay-900 duration-1000 fade-in"
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
                className="flex animate-in flex-col gap-4 delay-1100
                  duration-1000 slide-in-from-left-2 sm:flex-row"
              >
                <ConnectWallet
                  size={"lg"}
                  className="w-full px-10 py-6 text-lg font-medium
                    transition-all duration-300 hover:scale-[1.03] sm:w-auto"
                />
              </div>
            </div>

            <div
              className="animate-in space-y-6 delay-500 duration-1000
                slide-in-from-right-8"
            >
              <Card
                className="border-primary/20 bg-card/80 backdrop-blur-sm
                  transition-all duration-500 hover:scale-105 hover:shadow-xl"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icons.trendingUp className="h-5 w-5 text-primary" />
                    Live Token Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="rounded-lg bg-muted/50 p-4 text-center
                        transition-colors hover:bg-muted/70"
                    >
                      <p className="text-2xl font-bold text-primary">38%</p>
                      <p className="text-sm text-muted-foreground">
                        APY Target
                      </p>
                    </div>
                    <div
                      className="rounded-lg bg-muted/50 p-4 text-center
                        transition-colors hover:bg-muted/70"
                    >
                      <p className="text-2xl font-bold text-secondary">
                        0.02 BTC
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Bonus Yield
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tranche Progress</span>
                      <span>{trancheSold.toLocaleString()} / 10,000</span>
                    </div>
                    <Progress
                      value={animatedProgress}
                      className="h-2 transition-all duration-2000 ease-out"
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Next Distribution:
                      </span>
                      <span className="font-medium">Dec 15, 2024</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card
                  className="bg-card/60 p-4 text-center backdrop-blur-sm
                    transition-all duration-300 hover:scale-105
                    hover:bg-card/80"
                >
                  <div className="mb-2 flex items-center justify-center">
                    <Icons.shield className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">Bitcoin-grade</p>
                  <p className="text-xs text-muted-foreground">Security</p>
                </Card>
                <Card
                  className="bg-card/60 p-4 text-center backdrop-blur-sm
                    transition-all duration-300 hover:scale-105
                    hover:bg-card/80"
                >
                  <div className="mb-2 flex items-center justify-center">
                    <Icons.bitcoin className="h-6 w-6 text-secondary" />
                  </div>
                  <p className="text-sm font-semibold">Stacks</p>
                  <p className="text-xs text-muted-foreground">
                    Programmability
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
