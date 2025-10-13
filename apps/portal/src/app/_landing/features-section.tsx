"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { GlowCard } from "@/components/ui/glow-card"
import { Icons } from "@/components/common/icons"

export function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden py-20 lg:py-28">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/2 h-[500px] w-[800px]
            -translate-x-1/2 bg-gradient-to-b from-primary/10 to-transparent
            opacity-40 blur-3xl dark:from-primary/5 dark:opacity-40"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent
            via-background to-transparent"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <Badge
              variant="outline"
              className="mb-6 border-primary/30 bg-primary/5 px-4 py-2 text-sm
                font-semibold text-primary"
            >
              <Icons.trendingUp className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">
                Why It Matters — &ldquo;Real Yield Changes the Game&rdquo;
              </span>
              <span className="sm:hidden">Why It Matters</span>
            </Badge>

            <h2
              className="mb-6 text-4xl leading-tight font-bold tracking-tight
                text-balance lg:text-5xl"
            >
              From Speculation to{" "}
              <span
                className="bg-gradient-to-r from-primary to-primary/60
                  bg-clip-text text-transparent"
              >
                Sustainability
              </span>
            </h2>

            <p
              className="mx-auto max-w-3xl text-lg leading-relaxed text-pretty
                text-muted-foreground lg:text-xl"
            >
              When yield comes from customers, not token faucets, value
              compounds instead of decays.
            </p>
          </div>

          {/* Stat Highlights */}
          <div className="mb-16 grid gap-6 md:grid-cols-3">
            <Card
              className="border-primary/30 bg-gradient-to-br from-primary/10
                to-primary/15 p-8 text-center dark:border-primary/20
                dark:from-primary/5 dark:to-primary/10"
            >
              <p className="mb-2 text-4xl font-bold text-primary">$100K</p>
              <p className="text-sm text-muted-foreground">
                TVL from first tokenized client (trucking business)
              </p>
            </Card>
            <Card
              className="border-secondary/30 bg-gradient-to-br from-secondary/10
                to-secondary/15 p-8 text-center dark:border-secondary/20
                dark:from-secondary/5 dark:to-secondary/10"
            >
              <p className="mb-2 text-4xl font-bold text-secondary">200+</p>
              <p className="text-sm text-muted-foreground">
                transactions in MVP testnet
              </p>
            </Card>
            <Card
              className="border-chart-1/30 bg-gradient-to-br from-chart-1/10
                to-chart-1/15 p-8 text-center dark:border-chart-1/20
                dark:from-chart-1/5 dark:to-chart-1/10"
            >
              <p className="mb-2 text-4xl font-bold text-chart-1">6 months</p>
              <p className="text-sm text-muted-foreground">
                First dividends projected within launch
              </p>
            </Card>
          </div>

          <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Icons.building,
                title: "APT Fractionalization",
                desc: "Convert property equity into tradeable tokens with verified cash flows",
                color: "blue" as const,
              },
              {
                icon: Icons.bitcoin,
                title: "BTC Rewards",
                desc: "Earn Bitcoin rewards on top of revenue distributions",
                color: "orange" as const,
              },
              {
                icon: Icons.users,
                title: "PXT Governance",
                desc: "Vote on decisions, improvements, and distribution schedules",
                color: "purple" as const,
              },
              {
                icon: Icons.shield,
                title: "Clarity Smart Contracts",
                desc: "Bitcoin-secured contracts with automated distributions",
                color: "green" as const,
              },
              {
                icon: Icons.trendingUp,
                title: "Non-Dilutive Liquidity",
                desc: "Access capital without giving up ownership or debt",
                color: "blue" as const,
              },
              {
                icon: Icons.target,
                title: "Transparent Reporting",
                desc: "Real-time dashboards for performance and distributions",
                color: "purple" as const,
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <GlowCard
                  key={index}
                  glowColor={feature.color}
                  customSize
                  className="group !aspect-auto !h-auto cursor-pointer border
                    border-border/50 bg-card/50 !p-6 backdrop-blur-sm
                    hover:border-primary/30 hover:bg-card/80
                    dark:border-border/30 dark:bg-card/30
                    dark:hover:border-primary/50 dark:hover:bg-card/50"
                >
                  <div className="relative z-10">
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center
                        rounded-xl bg-gradient-to-br from-primary/30
                        to-primary/15 ring-1 ring-primary/30 transition-all
                        duration-300 group-hover:scale-110 group-hover:shadow-lg
                        group-hover:shadow-primary/30 dark:from-primary/20
                        dark:to-primary/10 dark:ring-primary/20
                        dark:group-hover:shadow-primary/20"
                    >
                      <Icon
                        className="h-6 w-6 text-primary transition-transform
                          duration-300 group-hover:rotate-6"
                      />
                    </div>
                    <h3
                      className="mb-3 text-xl leading-snug font-semibold
                        text-foreground"
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed text-muted-foreground
                        transition-colors duration-300
                        group-hover:text-foreground/80"
                    >
                      {feature.desc}
                    </p>
                  </div>
                </GlowCard>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
