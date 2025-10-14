"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@workspace/ui/lib/utils"
import { Icons } from "@workspace/ui/components/icons"

const SQRT_5000 = Math.sqrt(5000)

const testimonials = [
  {
    tempId: 0,
    testimonial:
      "PropertyX is an early step, not the finish line, but it points in the right direction.",
    by: "@PrinceTroyC",
    imgSrc:
      "https://pbs.twimg.com/profile_images/1906414343706537984/ucj7Y_f3_400x400.jpg",
    xPostUrl: "https://x.com/PrinceTroyC/status/1974846627887124949",
  },

  {
    tempId: 1,
    testimonial:
      "PropertyX is an early step, not the finish line, but it points in the right direction.",
    by: "@PrinceTroyC",
    imgSrc:
      "https://pbs.twimg.com/profile_images/1906414343706537984/ucj7Y_f3_400x400.jpg",
    xPostUrl: "https://x.com/PrinceTroyC/status/1974846627887124949",
  },

  {
    tempId: 2,
    testimonial:
      "PropertyX is an early step, not the finish line, but it points in the right direction.",
    by: "@PrinceTroyC",
    imgSrc:
      "https://pbs.twimg.com/profile_images/1906414343706537984/ucj7Y_f3_400x400.jpg",
    xPostUrl: "https://x.com/PrinceTroyC/status/1974846627887124949",
  },

  {
    tempId: 3,
    testimonial:
      "PropertyX is an early step, not the finish line, but it points in the right direction.",
    by: "@PrinceTroyC",
    imgSrc:
      "https://pbs.twimg.com/profile_images/1906414343706537984/ucj7Y_f3_400x400.jpg",
    xPostUrl: "https://x.com/PrinceTroyC/status/1974846627887124949",
  },

  {
    tempId: 4,
    testimonial:
      "PropertyX is an early step, not the finish line, but it points in the right direction.",
    by: "@PrinceTroyC",
    imgSrc:
      "https://pbs.twimg.com/profile_images/1906414343706537984/ucj7Y_f3_400x400.jpg",
    xPostUrl: "https://x.com/PrinceTroyC/status/1974846627887124949",
  },

  {
    tempId: 5,
    testimonial:
      "PropertyX is an early step, not the finish line, but it points in the right direction.",
    by: "@PrinceTroyC",
    imgSrc:
      "https://pbs.twimg.com/profile_images/1906414343706537984/ucj7Y_f3_400x400.jpg",
    xPostUrl: "https://x.com/PrinceTroyC/status/1974846627887124949",
  },
]

interface TestimonialCardProps {
  position: number
  testimonial: (typeof testimonials)[0]
  handleMove: (steps: number) => void
  cardSize: number
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0

  const handleCardClick = (e: React.MouseEvent) => {
    if (isCenter && testimonial.xPostUrl) {
      window.open(testimonial.xPostUrl, "_blank", "noopener,noreferrer")
    } else {
      handleMove(position)
    }
  }

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        `group absolute top-1/2 left-1/2 cursor-pointer border-2 p-8
        transition-all duration-500 ease-in-out`,
        isCenter
          ? `z-10 border-primary bg-primary text-primary-foreground
            hover:scale-105`
          : `z-0 border-border bg-card text-card-foreground
            hover:border-primary/50`
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px hsl(var(--border))"
          : "0px 0px 0px 0px transparent",
      }}
      title={isCenter ? "Click to view X post" : "Click to view details"}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <Image
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(",")[0]}`}
        width={48}
        height={56}
        className="mb-4 h-14 w-12 bg-muted object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))",
        }}
      />
      <h3
        className={cn(
          "pt-8 text-base font-medium sm:text-xl",
          isCenter ? "text-primary-foreground" : "text-foreground"
        )}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p
        className={cn(
          "absolute right-14 bottom-8 left-8 mt-2 text-sm italic",
          isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
        )}
      >
        - {testimonial.by}
      </p>

      {/* X/Twitter Icon - Bottom right corner */}
      {testimonial.xPostUrl && (
        <div
          className={cn(
            "absolute right-6 bottom-6 transition-all duration-300",
            isCenter
              ? "opacity-90 group-hover:scale-110 group-hover:opacity-100"
              : "opacity-40"
          )}
        >
          <svg
            className={cn(
              "h-7 w-7",
              isCenter ? "text-primary-foreground" : "text-muted-foreground"
            )}
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-label="View on X"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      )}
    </div>
  )
}

export function TestimonialsSection() {
  const [cardSize, setCardSize] = useState(365)
  const [testimonialsList, setTestimonialsList] = useState(testimonials)

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList]
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift()
        if (!item) return
        newList.push({ ...item, tempId: Math.random() })
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop()
        if (!item) return
        newList.unshift({ ...item, tempId: Math.random() })
      }
    }
    setTestimonialsList(newList)
  }

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)")
      setCardSize(matches ? 365 : 290)
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <section id="testimonials" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-balance">
              What Our Community Says
            </h2>
            <p
              className="mx-auto max-w-3xl text-xl text-pretty
                text-muted-foreground"
            >
              Real stories from property owners and investors who&apos;ve
              experienced PropertyX
            </p>
          </div>

          <div
            className="relative w-full overflow-hidden"
            style={{ height: 600 }}
          >
            {testimonialsList.map((testimonial, index) => {
              const position =
                testimonialsList.length % 2
                  ? index - (testimonialsList.length + 1) / 2
                  : index - testimonialsList.length / 2
              return (
                <TestimonialCard
                  key={testimonial.tempId}
                  testimonial={testimonial}
                  handleMove={handleMove}
                  position={position}
                  cardSize={cardSize}
                />
              )
            })}
            <div
              className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2"
            >
              <button
                onClick={() => handleMove(-1)}
                className={cn(
                  `flex h-14 w-14 items-center justify-center text-2xl
                  transition-colors`,
                  `border-2 border-border bg-background hover:bg-primary
                  hover:text-primary-foreground`,
                  `focus-visible:ring-2 focus-visible:ring-ring
                  focus-visible:ring-offset-2 focus-visible:outline-none`
                )}
                aria-label="Previous testimonial"
              >
                <Icons.chevronLeft />
              </button>
              <button
                onClick={() => handleMove(1)}
                className={cn(
                  `flex h-14 w-14 items-center justify-center text-2xl
                  transition-colors`,
                  `border-2 border-border bg-background hover:bg-primary
                  hover:text-primary-foreground`,
                  `focus-visible:ring-2 focus-visible:ring-ring
                  focus-visible:ring-offset-2 focus-visible:outline-none`
                )}
                aria-label="Next testimonial"
              >
                <Icons.chevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
