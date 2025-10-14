import { Badge } from "@workspace/ui/components/badge";
import { Card } from "@workspace/ui/components/card";
import { Icons } from "@workspace/ui/components/icons";

export function EcosystemSection() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/2 h-[500px] w-[800px]
            -translate-x-1/2 bg-gradient-to-b from-secondary/5 to-transparent
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
              className="mb-6 border-secondary/30 bg-secondary/5 px-4 py-2
                text-sm font-semibold text-secondary"
            >
              <Icons.award className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">
                Ecosystem Alignment — &ldquo;Powered by Stacks, Built for
                Builders&rdquo;
              </span>
              <span className="sm:hidden">Ecosystem Alignment</span>
            </Badge>

            <h2
              className="mb-6 text-4xl leading-tight font-bold tracking-tight
                text-balance lg:text-5xl"
            >
              Building the Future of{" "}
              <span
                className="bg-gradient-to-r from-secondary to-secondary/60
                  bg-clip-text text-transparent"
              >
                Bitcoin Finance
              </span>
            </h2>

            <p
              className="mx-auto max-w-3xl text-lg leading-relaxed text-pretty
                text-muted-foreground lg:text-xl"
            >
              Backed by Stacks Foundation Grant to pioneer Bitcoin-secured RWAs
              with an open framework for the entire ecosystem.
            </p>
          </div>

          <div className="mx-auto mb-12 max-w-5xl">
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card
              className="group relative overflow-hidden bg-card/80 p-6
                backdrop-blur-sm transition-all duration-500 hover:shadow-2xl"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0
                  transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--primary-rgb, 59, 130, 246), 0.1), transparent 40%)",
                }}
              />

              <div className="relative z-10">
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center
                    rounded-xl bg-primary/10 ring-1 ring-primary/20
                    transition-all duration-500 group-hover:scale-110
                    group-hover:bg-primary/20 group-hover:shadow-lg
                    group-hover:shadow-primary/20"
                  style={{
                    animation: "bounce 2s ease-in-out infinite",
                  }}
                >
                  <Icons.bitcoin
                    className="h-6 w-6 text-primary transition-transform
                      duration-500 group-hover:rotate-12"
                  />
                </div>
                <h3
                  className="mb-3 text-xl leading-snug font-semibold
                    text-foreground"
                >
                  Bitcoin-Secured
                </h3>
                <p
                  className="text-sm leading-relaxed text-muted-foreground
                    transition-colors duration-300
                    group-hover:text-foreground/80"
                >
                  Every transaction inherits Bitcoin&apos;s security through
                  Stacks&apos; proof-of-transfer mechanism.
                </p>
              </div>
            </Card>

            <Card
              className="group relative overflow-hidden bg-card/80 p-6
                backdrop-blur-sm transition-all duration-500 hover:shadow-2xl"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0
                  transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--secondary-rgb, 147, 51, 234), 0.1), transparent 40%)",
                }}
              />

              <div className="relative z-10">
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center
                    rounded-xl bg-secondary/10 ring-1 ring-secondary/20
                    transition-all duration-500 group-hover:scale-110
                    group-hover:bg-secondary/20 group-hover:shadow-lg
                    group-hover:shadow-secondary/20"
                  style={{
                    animation: "bounce 2s ease-in-out infinite 0.5s",
                  }}
                >
                  <Icons.shield
                    className="h-6 w-6 text-secondary transition-transform
                      duration-500 group-hover:rotate-12"
                  />
                </div>
                <h3
                  className="mb-3 text-xl leading-snug font-semibold
                    text-foreground"
                >
                  Open Framework
                </h3>
                <p
                  className="text-sm leading-relaxed text-muted-foreground
                    transition-colors duration-300
                    group-hover:text-foreground/80"
                >
                  Open-source legal and technical frameworks enable compliant
                  RWA projects.
                </p>
              </div>
            </Card>

            <Card
              className="group relative overflow-hidden bg-card/80 p-6
                backdrop-blur-sm transition-all duration-500 hover:shadow-2xl
                md:col-span-2 lg:col-span-1"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0
                  transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--chart-1-rgb, 34, 197, 94), 0.1), transparent 40%)",
                }}
              />

              <div className="relative z-10">
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center
                    rounded-xl bg-chart-1/10 ring-1 ring-chart-1/20
                    transition-all duration-500 group-hover:scale-110
                    group-hover:bg-chart-1/20 group-hover:shadow-lg
                    group-hover:shadow-chart-1/20"
                  style={{
                    animation: "bounce 2s ease-in-out infinite 1s",
                  }}
                >
                  <Icons.users
                    className="h-6 w-6 text-chart-1 transition-transform
                      duration-500 group-hover:rotate-12"
                  />
                </div>
                <h3
                  className="mb-3 text-xl leading-snug font-semibold
                    text-foreground"
                >
                  Community-First
                </h3>
                <p
                  className="text-sm leading-relaxed text-muted-foreground
                    transition-colors duration-300
                    group-hover:text-foreground/80"
                >
                  Built with and for the Stacks community to grow the Bitcoin
                  DeFi ecosystem.
                </p>
              </div>
            </Card>
          </div>

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
