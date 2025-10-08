"use client"

import { motion } from "motion/react"
import { useTheme } from "next-themes"
import * as React from "react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-md border
          border-input bg-background shadow-xs transition-all duration-300
          active:scale-95"
      >
        <div className="h-4 w-4" />
      </button>
    )
  }

  return (
    <button
      type="button"
      className={cn(
        `flex h-9 w-9 items-center justify-center rounded-lg border shadow-xs
        transition-all duration-300 hover:bg-accent active:scale-95`,
        "border-input bg-background text-foreground"
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 32 32"
        className="h-4 w-4"
      >
        <clipPath id="skiper-btn-4">
          <motion.path
            animate={{
              y: theme === "dark" ? 5 : 0,
              x: theme === "dark" ? -20 : 0,
            }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            d="M0-5h55v37h-55zm32 12a1 1 0 0025 0 1 1 0 00-25 0"
          />
        </clipPath>
        <g clipPath="url(#skiper-btn-4)">
          <circle cx="16" cy="16" r="15" />
        </g>
      </svg>
    </button>
  )
}
