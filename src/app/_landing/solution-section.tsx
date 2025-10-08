import { Card } from "@/components/ui/card"
import { Icons } from "@/components/common/icons"

export function SolutionSection() {
  return (
    <section id="how-it-works" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <div
              className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2"
            >
              <span className="text-sm font-semibold text-primary">
                The Solution — &ldquo;PropertyX: Real-World Yield, Secured by
                Bitcoin&rdquo;
              </span>
            </div>
            <h2 className="mb-6 text-4xl font-bold text-balance">
              Where Real-World Businesses Meet On-Chain Liquidity
            </h2>
            <p
              className="mx-auto max-w-3xl text-xl text-pretty
                text-muted-foreground"
            >
              PropertyX tokenizes future revenue from real businesses into
              yield-bearing digital assets. Liquidity providers fund tokenized
              offerings — like a trucking operation with recurring invoices —
              and earn dividends when revenue clears.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
              Each offering is fully transparent, legally structured, and
              powered by Stacks smart contracts that anchor every transaction to
              Bitcoin.
            </p>
          </div>

          {/* Core Features */}
          <div className="mb-16">
            <h3 className="mb-8 text-center text-2xl font-semibold">
              Core Features
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  emoji: "💸",
                  title: "Tokenized Cash Flows",
                  desc: "Turn business revenue into on-chain yield assets.",
                },
                {
                  emoji: "🪙",
                  title: "Staking & LP Pools",
                  desc: "Stake or provide liquidity to earn dividend shares.",
                },
                {
                  emoji: "⚖️",
                  title: "Compliant by Design",
                  desc: "Built with open-sourced legal and tokenomics frameworks.",
                },
                {
                  emoji: "🔗",
                  title: "Bitcoin Security",
                  desc: "All transactions settled on Stacks, secured by Bitcoin.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-card/80 p-6 text-center backdrop-blur-sm
                    transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="mb-4 text-4xl">{feature.emoji}</div>
                  <h4 className="mb-2 font-semibold">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* How It Works Process */}
          <div className="mb-16">
            <h3 className="mb-12 text-center text-2xl font-semibold">
              How It Works
            </h3>
            <p className="mb-8 text-center text-lg text-muted-foreground">
              From asset onboarding to secondary markets—PropertyX is your
              end‑to‑end RWA stack.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: 1,
                  title: "Asset Onboarding",
                  desc: "Digitize title & docs, KYC/KYB flow, issuer verification",
                },
                {
                  step: 2,
                  title: "Tokenization",
                  desc: "Mint compliant RWA tokens (ERC-like on Stacks), supply & rights encoded",
                },
                {
                  step: 3,
                  title: "Distribution",
                  desc: "Allowlists, capped rounds, secondary liquidity options",
                },
                {
                  step: 4,
                  title: "Management",
                  desc: "Payouts, reporting, redemption, governance hooks",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-card/80 p-6 text-center backdrop-blur-sm
                    transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div
                    className="mx-auto mb-4 flex h-12 w-12 items-center
                      justify-center rounded-full bg-primary"
                  >
                    <span className="text-xl font-bold text-primary-foreground">
                      {item.step}
                    </span>
                  </div>
                  <h4 className="mb-2 font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
