import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/common/icons"

export function EcosystemSection() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <div
              className="mb-4 inline-block rounded-full bg-secondary/10 px-4
                py-2"
            >
              <span className="text-sm font-semibold text-secondary">
                Ecosystem Alignment — &ldquo;Powered by Stacks, Built for
                Builders&rdquo;
              </span>
            </div>
            <h2 className="mb-6 text-4xl font-bold text-balance">
              Building the Future of Bitcoin Finance
            </h2>
            <p
              className="mx-auto max-w-3xl text-xl text-pretty
                text-muted-foreground"
            >
              PropertyX is proudly backed by the Stacks Foundation Grant to
              pioneer Bitcoin-secured RWAs. We&apos;re not just launching a
              protocol — we&apos;re building an open framework for the entire
              ecosystem.
            </p>
          </div>

          {/* Main Value Proposition */}
          <div className="mb-12">
            <Card
              className="border-primary/20 bg-gradient-to-br from-primary/5
                to-secondary/5 p-8 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center
                    justify-center rounded-lg bg-primary/20"
                >
                  <Icons.building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-3 text-2xl font-semibold">
                    Open-Sourced Legal & Tokenomics Framework
                  </h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Our open-sourced legal & tokenomics framework ensures that
                    the next RWA builder on Stacks doesn&apos;t start from zero.
                    We&apos;re creating the infrastructure for a new generation
                    of Bitcoin-native financial products.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Ecosystem Benefits */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card
              className="bg-card/80 p-6 backdrop-blur-sm transition-all
                duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center
                  rounded-lg bg-primary/10"
              >
                <Icons.bitcoin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Bitcoin-Secured</h3>
              <p className="text-muted-foreground">
                Every transaction inherits Bitcoin&apos;s security through
                Stacks&apos; proof-of-transfer mechanism, ensuring maximum trust
                and finality.
              </p>
            </Card>

            <Card
              className="bg-card/80 p-6 backdrop-blur-sm transition-all
                duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center
                  rounded-lg bg-secondary/10"
              >
                <Icons.shield className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Open Framework</h3>
              <p className="text-muted-foreground">
                Our legal and technical frameworks are open-source, enabling
                other builders to launch compliant RWA projects without
                reinventing the wheel.
              </p>
            </Card>

            <Card
              className="bg-card/80 p-6 backdrop-blur-sm transition-all
                duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center
                  rounded-lg bg-chart-1/10"
              >
                <Icons.users className="h-6 w-6 text-chart-1" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Community-First</h3>
              <p className="text-muted-foreground">
                Built with and for the Stacks community, PropertyX is committed
                to growing the Bitcoin DeFi ecosystem through collaboration and
                transparency.
              </p>
            </Card>
          </div>

          {/* Stacks Foundation Badge */}
          <div className="mt-12 text-center">
            <Badge variant="secondary" className="px-6 py-3 text-base">
              <Icons.award className="mr-2 h-5 w-5" />
              Stacks Foundation Grant Recipient
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
