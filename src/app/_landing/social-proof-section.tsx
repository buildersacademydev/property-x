export function SocialProofSection() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Metrics Bar */}
          <div
            className="mt-16 grid gap-8 rounded-lg border border-primary/20
              bg-card/50 p-8 backdrop-blur-sm md:grid-cols-3"
          >
            <div className="text-center">
              <p className="mb-2 text-3xl font-bold text-primary">$2.4M</p>
              <p className="text-sm text-muted-foreground">
                Total Capital Unlocked
              </p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-3xl font-bold text-secondary">100%</p>
              <p className="text-sm text-muted-foreground">
                Distribution Reliability
              </p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-3xl font-bold text-chart-1">0</p>
              <p className="text-sm text-muted-foreground">Defaults to Date</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
