"use client"

import { Badge } from "@workspace/ui/components/badge"
import { Card } from "@workspace/ui/components/card"
import { Icons } from "@workspace/ui/components/icons"

export function SolutionSection() {
  const coreFeatures = [
    {
      icon: Icons.dollarSign,
      title: "Tokenized Cash Flows",
      description: "Turn business revenue into on-chain yield assets.",
      pattern: "dots",
      color: "success",
    },
    {
      icon: Icons.bitcoin,
      title: "Staking & LP Pools",
      description: "Stake or provide liquidity to earn dividend shares.",
      pattern: "grid",
      color: "primary",
    },
    {
      icon: Icons.shield,
      title: "Compliant by Design",
      description: "Built with open-sourced legal and tokenomics frameworks.",
      pattern: "diagonal",
      color: "secondary",
    },
    {
      icon: Icons.checkCircle,
      title: "Bitcoin Security",
      description: "All transactions settled on Stacks, secured by Bitcoin.",
      pattern: "waves",
      color: "chart-1",
    },
  ]

  const processSteps = [
    {
      step: 1,
      title: "Asset Onboarding",
      description: "Digitize title & docs, KYC/KYB flow, issuer verification",
      icon: Icons.download,
      color: "secondary",
    },
    {
      step: 2,
      title: "Tokenization",
      description:
        "Mint compliant RWA tokens (ERC-like on Stacks), supply & rights encoded",
      icon: Icons.bitcoin,
      color: "primary",
    },
    {
      step: 3,
      title: "Distribution",
      description: "Allowlists, capped rounds, secondary liquidity options",
      icon: Icons.users,
      color: "success",
    },
    {
      step: 4,
      title: "Management",
      description: "Payouts, reporting, redemption, governance hooks",
      icon: Icons.award,
      color: "chart-1",
    },
  ]

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="from-success/5 absolute top-0 left-1/2 h-[500px] w-[800px]
            -translate-x-1/2 bg-gradient-to-b to-transparent opacity-40
            blur-3xl"
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
              className="border-success/30 bg-success/5 text-success mb-6 px-4
                py-2 text-sm font-semibold"
            >
              <Icons.checkCircle className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">
                The Solution — &ldquo;PropertyX: Real-World Yield, Secured by
                Bitcoin&rdquo;
              </span>
              <span className="sm:hidden">The Solution</span>
            </Badge>

            <h2
              className="mb-6 text-4xl leading-tight font-bold tracking-tight
                text-balance lg:text-5xl"
            >
              Where Real-World Businesses Meet{" "}
              <span
                className="from-success to-success/60 bg-gradient-to-r
                  bg-clip-text text-transparent"
              >
                On-Chain Liquidity
              </span>
            </h2>

            <p
              className="mx-auto max-w-3xl text-lg leading-relaxed text-pretty
                text-muted-foreground lg:text-xl"
            >
              Each offering is fully transparent, legally compliant, and secured
              by Stacks smart contracts anchored to Bitcoin.
            </p>
            <p
              className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground
                lg:text-lg"
            >
              PropertyX turns real business revenue into yield-bearing digital
              assets.
            </p>
          </div>

          {/* Core Features */}
          <div className="mb-20">
            <h3 className="mb-12 text-center text-3xl font-bold">
              Core Features
            </h3>
            <div className="grid gap-4 lg:grid-cols-2">
              {coreFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={index}
                    className="group relative overflow-hidden rounded-none
                      shadow-sm transition-all duration-300
                      hover:-translate-y-1"
                  >
                    <span
                      className="absolute -top-px -left-px block h-2 w-2
                        border-t-2 border-l-2"
                      style={{ borderColor: `var(--${feature.color})` }}
                    />
                    <span
                      className="absolute -top-px -right-px block h-2 w-2
                        border-t-2 border-r-2"
                      style={{ borderColor: `var(--${feature.color})` }}
                    />
                    <span
                      className="absolute -bottom-px -left-px block h-2 w-2
                        border-b-2 border-l-2"
                      style={{ borderColor: `var(--${feature.color})` }}
                    />
                    <span
                      className="absolute -right-px -bottom-px block h-2 w-2
                        border-r-2 border-b-2"
                      style={{ borderColor: `var(--${feature.color})` }}
                    />

                    <div className="p-6">
                      <div
                        className="flex items-center gap-2
                          text-muted-foreground"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{feature.title}</span>
                      </div>
                      <p className="mt-8 text-2xl leading-tight font-semibold">
                        {feature.description}
                      </p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* How It Works Process */}
          <div className="relative">
            <div className="mb-12 text-center">
              <h3 className="mb-4 text-3xl font-bold">How It Works</h3>
              <p className="text-lg text-muted-foreground">
                From asset onboarding to secondary markets—PropertyX is your
                end‑to‑end RWA stack.
              </p>
            </div>

            {/* Process Flow */}
            <div className="relative">
              {/* Connection Line */}
              <div
                className="via-success/30 absolute top-16 left-0 hidden h-0.5
                  w-full bg-gradient-to-r from-transparent via-secondary/30
                  to-transparent lg:block"
              />

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {processSteps.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Card
                      key={index}
                      className="group relative overflow-hidden p-6
                        backdrop-blur-sm transition-all duration-300
                        hover:-translate-y-2 hover:shadow-xl"
                      style={{
                        borderColor: `color-mix(in srgb, var(--${item.color}) 20%, transparent)`,
                        background: `linear-gradient(to bottom right, var(--card), color-mix(in srgb, var(--${item.color}) 5%, transparent), var(--card))`,
                      }}
                    >
                      {/* Step Number Badge */}
                      <div className="relative mb-6 flex justify-center">
                        <div
                          className="absolute inset-0 flex items-center
                            justify-center"
                        >
                          <div
                            className="h-16 w-16 animate-pulse rounded-full
                              blur-xl"
                            style={{
                              backgroundColor: `color-mix(in srgb, var(--${item.color}) 10%, transparent)`,
                              animationDuration: `${3 + index * 0.5}s`,
                            }}
                          />
                        </div>
                        <div
                          className="relative flex h-16 w-16 items-center
                            justify-center rounded-full ring-4 ring-background
                            transition-transform duration-300
                            group-hover:scale-110"
                          style={{
                            background: `linear-gradient(to bottom right, var(--${item.color}), color-mix(in srgb, var(--${item.color}) 80%, transparent))`,
                            boxShadow: `0 10px 25px -5px color-mix(in srgb, var(--${item.color}) 25%, transparent)`,
                          }}
                        >
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="text-center">
                        <div
                          className="mb-2 text-xs font-semibold tracking-wider
                            uppercase"
                          style={{ color: `var(--${item.color})` }}
                        >
                          Step {item.step}
                        </div>
                        <h4
                          className="mb-3 text-lg font-semibold text-foreground"
                        >
                          {item.title}
                        </h4>
                        <p
                          className="text-sm leading-relaxed
                            text-muted-foreground transition-colors duration-300
                            group-hover:text-foreground/80"
                        >
                          {item.description}
                        </p>
                      </div>

                      {/* Hover gradient effect */}
                      <div
                        className="pointer-events-none absolute inset-0
                          opacity-0 transition-opacity duration-500
                          group-hover:opacity-100"
                        style={{
                          background: `radial-gradient(600px circle at 50% 50%, color-mix(in srgb, var(--${item.color}) 8%, transparent), transparent 40%)`,
                        }}
                      />

                      {/* Progress indicator */}
                      <div
                        className="absolute bottom-0 left-0 h-1 transition-all
                          duration-500 group-hover:h-1.5"
                        style={{
                          width: `${25 * (index + 1)}%`,
                          background: `linear-gradient(to right, var(--${item.color}), color-mix(in srgb, var(--${item.color}) 50%, transparent))`,
                        }}
                      />
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
