import { Badge } from "@/components/ui/badge"
import ConnectWallet from "@/components/common/connect-wallet"
import { Icons } from "@/components/common/icons"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/10
            via-background to-secondary/10"
        />
        <div
          className="absolute top-1/2 left-1/2 h-[600px] w-[600px]
            -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20
            blur-3xl"
        />
      </div>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <Badge variant="secondary" className="mb-6">
            Future of Property Yield
          </Badge>
          <h2 className="mb-6 text-4xl font-bold text-balance md:text-5xl">
            Ready to Tokenize or Invest with Confidence?
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-xl text-muted-foreground">
            Secure your position in the next evolution of urban real estate.
            Whether you&apos;re unlocking capital from property or seeking yield
            with on-chain transparency—PropertyX gives you both.
          </p>
          <div
            className="mx-auto mb-12 grid max-w-4xl gap-6 text-left
              sm:grid-cols-2"
          >
            {[
              {
                icon: <Icons.checkCircle className="h-5 w-5 text-primary" />,
                title: "On-Chain, Audited Cash Flows",
                text: "Automated monthly distributions—no opaque intermediaries.",
              },
              {
                icon: <Icons.checkCircle className="h-5 w-5 text-primary" />,
                title: "Low Entry, High Clarity",
                text: "Access institutional-grade deals starting around $1K.",
              },
              {
                icon: <Icons.checkCircle className="h-5 w-5 text-primary" />,
                title: "BTC-Aligned Rewards",
                text: "Earn additional Bitcoin incentives for early support.",
              },
              {
                icon: <Icons.checkCircle className="h-5 w-5 text-primary" />,
                title: "Keep Ownership, Unlock Capital",
                text: "Raise funds without selling equity or taking on debt.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 rounded-lg border
                  border-primary/10 bg-card/70 p-5 backdrop-blur-sm
                  transition-colors hover:bg-card/90"
              >
                <div
                  className="mt-1 flex h-8 w-8 items-center justify-center
                    rounded-full bg-primary/15"
                >
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center">
            <ConnectWallet
              size={"lg"}
              className="w-full max-w-md px-10 py-7 text-lg font-medium
                shadow-xl transition-all duration-300 hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
