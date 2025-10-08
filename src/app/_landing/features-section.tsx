"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/common/icons"

export function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <div
              className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2"
            >
              <span className="text-sm font-semibold text-primary">
                Why It Matters — &ldquo;Real Yield Changes the Game&rdquo;
              </span>
            </div>
            <h2 className="mb-6 text-4xl font-bold text-balance">
              From Speculation to Sustainability
            </h2>
            <p
              className="mx-auto max-w-3xl text-xl text-pretty
                text-muted-foreground"
            >
              When yield comes from customers, not token faucets, value
              compounds instead of decays. PropertyX creates a new class of
              yield — Bitcoin-secured, revenue-backed, transparent.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
              This model scales beyond one client or sector — any business with
              steady cash flow can tokenize and raise liquidity, while LPs earn
              yield grounded in reality.
            </p>
          </div>

          {/* Stat Highlights */}
          <div className="mb-16 grid gap-6 md:grid-cols-3">
            <Card
              className="border-primary/20 bg-gradient-to-br from-primary/5
                to-primary/10 p-8 text-center"
            >
              <p className="mb-2 text-4xl font-bold text-primary">$100K</p>
              <p className="text-sm text-muted-foreground">
                TVL from first tokenized client (trucking business)
              </p>
            </Card>
            <Card
              className="border-secondary/20 bg-gradient-to-br from-secondary/5
                to-secondary/10 p-8 text-center"
            >
              <p className="mb-2 text-4xl font-bold text-secondary">200+</p>
              <p className="text-sm text-muted-foreground">
                transactions in MVP testnet
              </p>
            </Card>
            <Card
              className="border-chart-1/20 bg-gradient-to-br from-chart-1/5
                to-chart-1/10 p-8 text-center"
            >
              <p className="mb-2 text-4xl font-bold text-chart-1">6 months</p>
              <p className="text-sm text-muted-foreground">
                First dividends projected within launch
              </p>
            </Card>
          </div>

          {/* Feature Cards */}
          <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Icons.building,
                title: "APT Fractionalization",
                desc: "Convert property equity into tradeable tokens representing 45% of net operating income",
                color: "text-primary",
              },
              {
                icon: Icons.bitcoin,
                title: "BTC Rewards",
                desc: "Earn additional Bitcoin rewards on top of cash distributions through our yield enhancement program (Coming Soon)",
                color: "text-secondary",
              },
              {
                icon: Icons.users,
                title: "PXT Governance",
                desc: "Vote on protocol decisions, property improvements, and distribution schedules with governance tokens",
                color: "text-chart-1",
              },
              {
                icon: Icons.shield,
                title: "Clarity Smart Contracts",
                desc: "Bitcoin-secured contracts ensure transparent, automated distributions and immutable ownership records",
                color: "text-chart-2",
              },
              {
                icon: Icons.trendingUp,
                title: "Non-Dilutive Liquidity",
                desc: "Access capital without giving up ownership control or taking on debt obligations",
                color: "text-chart-3",
              },
              {
                icon: Icons.target,
                title: "Transparent Reporting",
                desc: "Real-time dashboards show property performance, cash flows, and token holder distributions",
                color: "text-chart-4",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="cursor-pointer bg-card/80 p-6 backdrop-blur-sm
                  transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center
                  rounded-lg transition-all duration-300 ${
                    hoveredFeature === index
                      ? "scale-110 bg-primary/20"
                      : "bg-muted/50"
                  }`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
