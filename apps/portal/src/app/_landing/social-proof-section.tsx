import React from "react"
import type { SVGProps } from "react"
import { cn } from "@/lib/utils"

export function SocialProofSection() {
  const partners = [
    {
      icon: Bitcoin,
      alt: "Bitcoin",
      gradient: { from: "#F7931A", via: "#FFA500", to: "#FF8C00" },
    },
    {
      icon: Stacks,
      alt: "Stacks",
      gradient: { from: "#5546FF", via: "#4435DD", to: "#3324BB" },
    },
    {
      icon: Clarity,
      alt: "Clarity",
      gradient: { from: "#13171a", via: "#2C3236", to: "#454D52" },
    },
    {
      icon: Hiro,
      alt: "Hiro",
      gradient: { from: "#6366F1", via: "#818CF8", to: "#A5B4FC" },
    },
    {
      icon: Bitcoin,
      alt: "Bitcoin",
      gradient: { from: "#F7931A", via: "#FFA500", to: "#FF8C00" },
    },
    {
      icon: Stacks,
      alt: "Stacks",
      gradient: { from: "#5546FF", via: "#4435DD", to: "#3324BB" },
    },
    {
      icon: Clarity,
      alt: "Clarity",
      gradient: { from: "#13171a", via: "#2C3236", to: "#454D52" },
    },
    {
      icon: Hiro,
      alt: "Hiro",
      gradient: { from: "#6366F1", via: "#818CF8", to: "#A5B4FC" },
    },
  ]

  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <MarqueeLogoScroller
          title="Powered by Industry Leaders"
          description="Built on the most secure and decentralized blockchain infrastructure, trusted by developers and institutions worldwide."
          logos={partners}
          speed="normal"
        />
      </div>
    </section>
  )
}

interface Logo {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>
  alt: string
  gradient: {
    from: string
    via: string
    to: string
  }
}

interface MarqueeLogoScrollerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  logos: Logo[]
  speed?: "normal" | "slow" | "fast"
}

const MarqueeLogoScroller = React.forwardRef<
  HTMLDivElement,
  MarqueeLogoScrollerProps
>(
  (
    { title, description, logos, speed = "normal", className, ...props },
    ref
  ) => {
    const durationMap = {
      normal: "40s",
      slow: "80s",
      fast: "5s",
    }
    const animationDuration = durationMap[speed]

    return (
      <>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>

        <section
          ref={ref}
          aria-label={title}
          className={cn(
            `w-full overflow-hidden rounded-lg border bg-background
            text-foreground`,
            className
          )}
          {...props}
        >
          <div className="p-6 md:p-8 lg:p-10">
            <div
              className="grid grid-cols-1 gap-6 border-b pb-6 md:pb-8
                lg:grid-cols-[3fr_2fr] lg:gap-8"
            >
              <h2
                className="text-3xl font-semibold tracking-tighter text-balance
                  md:text-4xl"
              >
                {title}
              </h2>
              <p
                className="self-start text-balance text-muted-foreground
                  lg:justify-self-end"
              >
                {description}
              </p>
            </div>
          </div>

          {/* Marquee Section */}
          <div
            className="w-full overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div
              className="flex w-max items-center gap-4 py-4 pr-4 transition-all
                duration-300 ease-in-out hover:[animation-play-state:paused]"
              style={{
                animation: `marquee ${animationDuration} linear infinite`,
              }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="group relative flex h-24 w-40 shrink-0 items-center
                    justify-center overflow-hidden rounded-lg"
                >
                  <div
                    style={
                      {
                        "--from": logo.gradient.from,
                        "--via": logo.gradient.via,
                        "--to": logo.gradient.to,
                      } as React.CSSProperties
                    }
                    className="absolute inset-0 bg-gradient-to-br
                      from-[var(--from)] via-[var(--via)] to-[var(--to)]
                      transition-all duration-700 ease-out
                      group-hover:scale-110"
                  />
                  <logo.icon
                    className="relative h-3/4 w-auto object-contain"
                    aria-label={logo.alt}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }
)

MarqueeLogoScroller.displayName = "MarqueeLogoScroller"

const Bitcoin = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" fill="currentColor">
    <circle cx="16" cy="16" r="16" fill="#F7931A" />
    <path
      d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"
      fill="#FFF"
    />
  </svg>
)

const Clarity = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 128 128">
    <path
      d="M86.987-7.796e-5h-45.974c-22.576 0-40.877 18.34-40.877 40.964v46.072c0 22.623 18.302 40.964 40.877 40.964h45.974c22.576 0 40.877-18.34 40.877-40.964v-46.072c0-22.623-18.301-40.964-40.877-40.964z"
      fill="#13171a"
    />
    <path
      d="M38.497 31.809c1.7885-1.6202 3.8788-2.8703 6.1509-3.6787 2.2721-0.80825 4.6811-1.1588 7.0887-1.0314v6.0699c-1.5818-0.0869-3.164 0.16385-4.6418 0.73569s-2.8177 1.4516-3.9308 2.5813c-2.144 3.0168-3.1738 6.6873-2.9127 10.382v34.131c-0.26109 3.6942 0.76869 7.3646 2.9127 10.382 1.1042 1.2152 2.4637 2.1698 3.9804 2.7952 1.5168 0.62458 3.153 0.90525 4.7909 0.82043v5.9373c-2.4099 0.12261-4.8203-0.23286-7.0924-1.0471-2.2722-0.81426-4.3613-2.0704-6.1472-3.6966-1.7605-1.9786-3.0999-4.2965-3.9365-6.811-0.83654-2.5153-1.1527-5.1747-0.92907-7.8164v-35.126c-0.24651-2.6276 0.03986-5.278 0.84186-7.7918 0.80208-2.5137 2.1032-4.839 3.8251-6.8358z"
      fill="#7e858b"
    />
    <path
      d="M59.714 31.809c3.6161-3.266 8.3778-4.96 13.239-4.7101v6.0699c-1.5868-0.08736-3.1742 0.16301-4.6574 0.73468-1.4833 0.57176-2.8289 1.4518-3.9483 2.5823-2.1323 3.0212-3.1503 6.6913-2.8797 10.382v34.131c-0.27065 3.6904 0.74733 7.3607 2.8797 10.382 1.107 1.2114 2.467 2.1637 3.983 2.7882 1.516 0.62535 3.1509 0.90756 4.7882 0.82737v5.9373c-2.4368 0.14111-4.8773-0.2051-7.179-1.0194-2.3016-0.81503-4.4182-2.0804-6.2261-3.7243-1.7546-1.9809-3.088-4.3003-3.9188-6.8148-0.83084-2.5153-1.1417-5.1732-0.91365-7.8126v-35.126c-0.22616-2.6392 0.08567-5.2968 0.91643-7.811 0.83068-2.5146 2.163-4.8336 3.916-6.8161z"
      fill="#f7f8f9"
    />
    <path
      d="M80.997 31.809c3.6179-3.2628 8.3786-4.9563 13.239-4.7101v6.0699c-1.5923-0.08998-3.1853 0.159-4.6743 0.73075-1.489 0.57176-2.8399 1.4531-3.9641 2.5862-2.1043 3.0789-3.0643 6.7995-2.7142 10.514v33.998c-0.27065 3.6904 0.74718 7.3607 2.8792 10.382 1.1088 1.2098 2.469 2.1606 3.9842 2.7851 1.5159 0.62458 3.1499 0.90833 4.7869 0.83045v5.9373c-4.8647 0.23364-9.6246-1.472-13.239-4.7437-1.7835-1.9693-3.1491-4.2818-4.0135-6.7963-0.86492-2.5145-1.211-5.1786-1.0174-7.8311v-35.126c-0.23179-2.6318 0.06786-5.2834 0.88104-7.7964 0.81334-2.5132 2.1234-4.8364 3.8522-6.831z"
      fill="#7e858b"
    />
  </svg>
)

const Stacks = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 159.8 159.8">
    <circle fill="#5546FF" cx="79.9" cy="79.9" r="79.9" />
    <path
      fill="#FFFFFF"
      d="M112.5,122L95.3,95H120V84.8H39v10.2h24.7L46.5,122h12.8l20.2-31.7L99.7,122H112.5z M120,74.9V64.7H95.8  l17-26.7H99.9L79.5,70.2L59.1,38H46.2l17,26.7H39V75L120,74.9L120,74.9z"
    />
  </svg>
)

const Hiro = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 12 7" fill="currentColor">
    <line
      stroke="currentColor"
      strokeWidth="1.2"
      transform="matrix(0.680451 0.732793 -0.680451 0.732793 0 1)"
      x2="7.05414"
      y1="-0.6"
      y2="-0.6"
    />
    <line
      stroke="currentColor"
      strokeWidth="1.2"
      transform="matrix(-0.680451 0.732793 0.680451 0.732793 12 1)"
      x2="7.05414"
      y1="-0.6"
      y2="-0.6"
    />
  </svg>
)

export { MarqueeLogoScroller, Bitcoin, Clarity, Stacks, Hiro }
