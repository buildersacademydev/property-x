"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/common/icons"

export function ProblemSection() {
  const problems = [
    {
      icon: Icons.x,
      title: "Unsustainable Emissions",
      description:
        "Traditional DeFi prints tokens as rewards, creating inflationary pressure that eventually collapses yield structures.",
      stat: "90%",
      statLabel: "protocols fail",
    },
    {
      icon: Icons.error,
      title: "No Real Value",
      description:
        "When yield isn't backed by actual revenue, it's just moving numbers around until liquidity dries up.",
      stat: "0",
      statLabel: "underlying assets",
    },
    {
      icon: Icons.shield,
      title: "Trust Deficit",
      description:
        "Without transparency into underlying assets and cash flows, investors are essentially gambling on protocol promises.",
      stat: "???",
      statLabel: "black box yield",
    },
  ]

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/2 h-[500px] w-[800px]
            -translate-x-1/2 bg-gradient-to-b from-destructive/5 to-transparent
            opacity-40 blur-3xl"
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
              className="mb-6 border-destructive/30 bg-destructive/5 px-4 py-2
                text-sm font-semibold text-destructive"
            >
              <Icons.error className="mr-2 h-4 w-4" />
              The Problem — &ldquo;Speculative Yield is Broken&rdquo;
            </Badge>

            <h2
              className="mb-6 text-4xl leading-tight font-bold tracking-tight
                text-balance lg:text-5xl"
            >
              The DeFi Yield Model is{" "}
              <span
                className="bg-gradient-to-r from-destructive to-destructive/60
                  bg-clip-text text-transparent"
              >
                Failing
              </span>
            </h2>

            <p
              className="mx-auto max-w-3xl text-lg leading-relaxed text-pretty
                text-muted-foreground lg:text-xl"
            >
              Most DeFi protocols rely on unsustainable token emissions. They
              mint rewards out of thin air — until the music stops.
            </p>
          </div>

          {/* Problem Cards Grid */}
          <div className="mb-16 grid gap-6 md:grid-cols-3">
            {problems.map((problem, index) => {
              const Icon = problem.icon
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden
                    border-destructive/20 bg-gradient-to-br from-destructive/5
                    via-card to-card p-6 transition-all duration-300
                    hover:-translate-y-1 hover:border-destructive/40
                    hover:shadow-lg hover:shadow-destructive/10"
                >
                  {/* Unique Background Patterns */}
                  {index === 0 && (
                    <>
                      {/* Diagonal Lines Pattern - Animated */}
                      <div
                        className="pointer-events-none absolute inset-0
                          opacity-20 transition-opacity duration-500
                          group-hover:opacity-30"
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 10px,
                            rgba(239, 68, 68, 0.08) 10px,
                            rgba(239, 68, 68, 0.08) 20px
                          )`,
                          animation: "slidePattern 20s linear infinite",
                          backgroundSize: "200% 200%",
                        }}
                      />
                      {/* Cross-hatch overlay */}
                      <div
                        className="pointer-events-none absolute inset-0
                          opacity-10"
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                            -45deg,
                            transparent,
                            transparent 15px,
                            rgba(239, 68, 68, 0.05) 15px,
                            rgba(239, 68, 68, 0.05) 30px
                          )`,
                        }}
                      />
                    </>
                  )}

                  {index === 1 && (
                    <>
                      {/* Animated Dots Pattern */}
                      <div
                        className="pointer-events-none absolute inset-0
                          opacity-25 transition-opacity duration-500
                          group-hover:opacity-35"
                        style={{
                          backgroundImage: `radial-gradient(circle, rgba(239, 68, 68, 0.12) 1.5px, transparent 1.5px)`,
                          backgroundSize: "20px 20px",
                          animation: "movePattern 15s ease-in-out infinite",
                        }}
                      />
                      {/* Secondary dots layer */}
                      <div
                        className="pointer-events-none absolute inset-0
                          opacity-15"
                        style={{
                          backgroundImage: `radial-gradient(circle, rgba(239, 68, 68, 0.08) 1px, transparent 1px)`,
                          backgroundSize: "30px 30px",
                          backgroundPosition: "10px 10px",
                          animation:
                            "movePattern 20s ease-in-out infinite reverse",
                        }}
                      />
                    </>
                  )}

                  {index === 2 && (
                    <>
                      {/* Animated Grid Pattern */}
                      <div
                        className="pointer-events-none absolute inset-0
                          opacity-20 transition-opacity duration-500
                          group-hover:opacity-30"
                        style={{
                          backgroundImage: `
                            linear-gradient(rgba(239, 68, 68, 0.08) 1.5px, transparent 1.5px),
                            linear-gradient(90deg, rgba(239, 68, 68, 0.08) 1.5px, transparent 1.5px)
                          `,
                          backgroundSize: "25px 25px",
                          animation: "pulsePattern 8s ease-in-out infinite",
                        }}
                      />
                      {/* Zigzag accent pattern */}
                      <div
                        className="pointer-events-none absolute inset-0
                          opacity-10"
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 20px,
                            rgba(239, 68, 68, 0.05) 20px,
                            rgba(239, 68, 68, 0.05) 22px
                          )`,
                        }}
                      />
                    </>
                  )}

                  {/* Hover gradient effect */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0
                      transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(600px circle at 50% 50%, rgba(239, 68, 68, 0.06), transparent 40%)",
                    }}
                  />

                  {/* Animated border shimmer on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0
                      transition-opacity duration-500 group-hover:opacity-100"
                  >
                    <div
                      className="absolute inset-0 animate-spin rounded-lg"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent, rgba(239, 68, 68, 0.2), transparent)",
                        animationDuration: "3s",
                      }}
                    />
                    <div className="absolute inset-[1px] rounded-lg bg-card" />
                  </div>

                  <div className="relative z-10">
                    {/* Icon and Stat */}
                    <div className="mb-4 flex items-start justify-between">
                      <div
                        className="flex h-12 w-12 items-center justify-center
                          rounded-xl bg-destructive/10 ring-1
                          ring-destructive/20 transition-all duration-300
                          group-hover:bg-destructive/20 group-hover:shadow-lg
                          group-hover:shadow-destructive/20
                          group-hover:ring-destructive/30"
                      >
                        <Icon
                          className="h-6 w-6 text-destructive
                            transition-transform duration-300
                            group-hover:scale-110 group-hover:rotate-6"
                        />
                      </div>
                      <div className="text-right">
                        <div
                          className="text-2xl font-bold text-destructive/80
                            transition-all duration-300 group-hover:scale-110
                            group-hover:text-destructive"
                        >
                          {problem.stat}
                        </div>
                        <div className="text-xs font-medium text-destructive/60">
                          {problem.statLabel}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3
                      className="mb-3 text-lg leading-snug font-semibold
                        text-foreground transition-colors duration-300
                        group-hover:text-destructive"
                    >
                      {problem.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed text-muted-foreground
                        transition-colors duration-300
                        group-hover:text-foreground/80"
                    >
                      {problem.description}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Solution Preview Card */}
          <div className="mx-auto max-w-5xl">
            <Card
              className="relative overflow-hidden border-primary/20
                bg-gradient-to-br from-card via-primary/5 to-card p-8
                backdrop-blur-sm lg:p-12"
            >
              {/* Decorative gradient */}
              <div
                className="pointer-events-none absolute -top-40 -right-40 h-80
                  w-80 rounded-full bg-gradient-to-br from-primary/20
                  to-transparent opacity-50 blur-3xl"
              />

              <div className="relative">
                <div className="mb-8 flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center
                      justify-center rounded-2xl bg-gradient-to-br from-primary
                      to-primary/80 shadow-lg shadow-primary/25"
                  >
                    <Icons.checkCircle className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3
                      className="mb-2 text-2xl leading-tight font-bold
                        text-foreground lg:text-3xl"
                    >
                      PropertyX Changes This Narrative
                    </h3>
                    <p className="text-base text-muted-foreground lg:text-lg">
                      By tying yield directly to real business performance
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p
                    className="text-base leading-relaxed text-muted-foreground
                      lg:text-lg"
                  >
                    Instead of token faucets, yield on PropertyX comes from{" "}
                    <strong className="font-semibold text-foreground">
                      customer payments
                    </strong>
                    ,{" "}
                    <strong className="font-semibold text-foreground">
                      verified cash flow
                    </strong>
                    , and{" "}
                    <strong className="font-semibold text-foreground">
                      on-chain revenue distribution
                    </strong>
                    .
                  </p>

                  {/* Key Message Highlight */}
                  <div
                    className="relative overflow-hidden rounded-2xl border
                      border-primary/30 bg-gradient-to-br from-primary/10
                      via-primary/5 to-transparent p-8 text-center
                      backdrop-blur-sm"
                  >
                    {/* Decorative elements */}
                    <div
                      className="pointer-events-none absolute top-0 left-0
                        h-full w-1 bg-gradient-to-b from-primary via-primary/50
                        to-transparent"
                    />
                    <div
                      className="pointer-events-none absolute top-0 right-0
                        h-full w-1 bg-gradient-to-b from-primary via-primary/50
                        to-transparent"
                    />

                    <div className="relative space-y-3">
                      <p
                        className="text-lg font-medium text-muted-foreground
                          lg:text-xl"
                      >
                        This is not yield farming —
                      </p>
                      <div
                        className="group inline-block animate-in delay-300
                          duration-1000 slide-in-from-bottom-4"
                      >
                        <p
                          className="bg-gradient-to-r from-primary
                            via-primary/80 to-primary bg-clip-text text-3xl
                            leading-tight font-bold tracking-tight
                            text-transparent transition-all duration-300
                            group-hover:from-primary/90
                            group-hover:via-primary/70 group-hover:to-primary/90
                            lg:text-4xl"
                          style={{
                            textShadow: "0 0 30px rgba(var(--primary), 0.3)",
                          }}
                        >
                          it&apos;s real finance, on Bitcoin
                        </p>
                        {/* Animated underline */}
                        <div
                          className="mx-auto mt-2 h-1 w-0 rounded-full
                            bg-gradient-to-r from-transparent via-primary
                            to-transparent transition-all duration-500
                            group-hover:w-full"
                        />
                      </div>
                      <div
                        className="flex items-center justify-center gap-2 pt-2"
                      >
                        <Icons.bitcoin
                          className="h-5 w-5 animate-pulse text-primary"
                        />
                        <span className="text-sm font-medium text-primary">
                          Bitcoin-Secured
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature Pills */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "Real Revenue",
                    "Transparent",
                    "Bitcoin-Secured",
                    "Sustainable",
                  ].map((feature, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-primary/10 px-4 py-1.5 text-sm font-medium
                        text-primary hover:bg-primary/20"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
