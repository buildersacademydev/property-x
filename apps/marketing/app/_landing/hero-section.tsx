import type React from "react"
import { Icons } from "@workspace/ui/components/icons"
import LaunchApp from "@/components/launch-app"
import Banner from "@/components/banner"

export function HeroSection() {
    return (
        <section
            id="hero"
            className="relative -mt-12 min-h-screen w-full overflow-hidden
        bg-[linear-gradient(to_bottom,var(--background),var(--muted)_30%,color-mix(in_oklab,var(--primary)_80%,transparent)_88%)]"
        >
            <div className="pointer-events-none absolute inset-0 z-0">
                <div
                    className="absolute inset-0
            bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_60%)]"
                />
                <div
                    className="absolute top-0 left-1/2 h-64 w-[120%] -translate-x-1/2
            bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5
            opacity-60 blur-3xl"
                />
            </div>

            <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.3) 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 80% 50% at 50% 0%, #000 40%, transparent 100%)",
                    maskImage:
                        "radial-gradient(ellipse 80% 50% at 50% 0%, #000 40%, transparent 100%)",
                }}
            />

            <div
                className="relative z-20 container mx-auto px-4 pt-36 pb-24 md:pt-40
          md:pb-28"
            >
                <div className="mx-auto max-w-4xl">
                    <div className="flex flex-col items-center text-center">
                        <div
                            className="w-full animate-in space-y-8 duration-1000
                slide-in-from-bottom-8"
                        >
                            <div className="space-y-4">
                                <Banner text=" $35,000 grant secured from stacks" />

                                <h1
                                    className="animate-in text-[clamp(2.4rem,6vw,3.75rem)]
                    leading-[1.05] font-bold tracking-tight text-balance
                    delay-500 duration-1000 slide-in-from-bottom-6"
                                >
                                    The First
                                    <span className="text-primary">
                                        {" "}
                                        Real Yield RWA Protocol
                                    </span>{" "}
                                    on Stacks
                                </h1>

                                <p
                                    className="mx-auto max-w-2xl animate-in
                    text-[clamp(1.05rem,1.3vw,1.25rem)] leading-relaxed
                    text-pretty text-foreground/90 delay-500 duration-1000
                    slide-in-from-bottom-4"
                                >
                                    Tokenize real business cash flows — not hype. Earn
                                    sustainable, transparent yield secured by Bitcoin through
                                    Stacks&apos; programmability and Bitcoin-grade security.
                                </p>
                            </div>

                            <div
                                className="-mb-0.5 flex animate-in flex-col items-center gap-4
                  opacity-40 delay-900 duration-1000 fade-in"
                            >
                                <div
                                    className="group relative rounded-full border
                    border-primary/20 bg-primary/5 px-6 py-2.5 backdrop-blur-sm
                    transition-all duration-300 hover:border-primary/40
                    hover:bg-primary/10"
                                >
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <Icons.shield className="h-4 w-4 text-primary" />
                                        <span className="text-foreground">Built on</span>
                                        <span
                                            className="bg-gradient-to-r from-primary to-primary/70
                        bg-clip-text font-semibold text-transparent"
                                        >
                                            Stacks
                                        </span>
                                    </div>
                                    <div
                                        className="absolute inset-0 -z-10 rounded-full bg-primary/20
                      opacity-0 blur-xl transition-opacity duration-300
                      group-hover:opacity-100"
                                    />
                                </div>
                            </div>

                            <div
                                className="flex animate-in justify-center delay-1100
                  duration-1000 slide-in-from-bottom-2"
                            >
                                <LaunchApp
                                    size={"lg"}
                                    className="mt-6 px-10 py-6 text-lg font-medium transition-all
                    duration-300 hover:scale-[1.03]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="absolute top-[calc(100%-70px)] left-1/2 h-[300px] w-[100%]
          -translate-x-1/2 rounded-[100%]
          bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--muted)_95%,var(--primary)_10%)_82%,color-mix(in_oklab,var(--primary)_70%,transparent))]
          sm:top-[calc(100%-80px)] sm:h-[400px] md:top-[calc(100%-90px)]
          md:h-[500px] md:w-[1100px] lg:top-[calc(100%-150px)] lg:h-[750px]
          lg:w-[100%]"
            />
        </section>
    )
}
