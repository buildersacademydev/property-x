import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/common/icons"

export function ProblemSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <div
              className="mb-4 inline-block rounded-full bg-destructive/10 px-4
                py-2"
            >
              <span className="text-sm font-semibold text-destructive">
                The Problem — &ldquo;Speculative Yield is Broken&rdquo;
              </span>
            </div>
            <h2 className="mb-6 text-4xl font-bold text-balance">
              The DeFi Yield Model is Failing
            </h2>
            <p
              className="mx-auto max-w-3xl text-xl text-pretty
                text-muted-foreground"
            >
              Most DeFi protocols rely on unsustainable token emissions. They
              mint rewards out of thin air — until the music stops.
            </p>
          </div>

          <div className="mb-12">
            <Card
              className="border-destructive/20 bg-card/80 p-8 backdrop-blur-sm"
            >
              <div className="mx-auto max-w-4xl space-y-6 text-center">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">
                    PropertyX changes this narrative
                  </strong>{" "}
                  by tying yield directly to real business performance.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Instead of token faucets, yield on PropertyX comes from{" "}
                  <strong className="text-foreground">customer payments</strong>
                  ,{" "}
                  <strong className="text-foreground">
                    verified cash flow
                  </strong>
                  , and{" "}
                  <strong className="text-foreground">
                    on-chain revenue distribution
                  </strong>
                  .
                </p>
                <Alert className="border-primary/20 bg-primary/5 text-left">
                  <Icons.target className="h-5 w-5" />
                  <AlertDescription className="text-base">
                    This is not yield farming — it&apos;s{" "}
                    <strong>real finance, on Bitcoin</strong>.
                  </AlertDescription>
                </Alert>
              </div>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card
              className="border-destructive/20 bg-destructive/5 p-6
                transition-all duration-300 hover:shadow-lg"
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center
                  rounded-lg bg-destructive/20"
              >
                <Icons.x className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="mb-3 text-lg font-semibold">
                Unsustainable Emissions
              </h3>
              <p className="text-sm text-muted-foreground">
                Traditional DeFi prints tokens as rewards, creating inflationary
                pressure that eventually collapses yield structures.
              </p>
            </Card>

            <Card
              className="border-destructive/20 bg-destructive/5 p-6
                transition-all duration-300 hover:shadow-lg"
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center
                  rounded-lg bg-destructive/20"
              >
                <Icons.x className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="mb-3 text-lg font-semibold">No Real Value</h3>
              <p className="text-sm text-muted-foreground">
                When yield isn&apos;t backed by actual revenue, it&apos;s just
                moving numbers around until liquidity dries up.
              </p>
            </Card>

            <Card
              className="border-destructive/20 bg-destructive/5 p-6
                transition-all duration-300 hover:shadow-lg"
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center
                  rounded-lg bg-destructive/20"
              >
                <Icons.x className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="mb-3 text-lg font-semibold">Trust Deficit</h3>
              <p className="text-sm text-muted-foreground">
                Without transparency into underlying assets and cash flows,
                investors are essentially gambling on protocol promises.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
