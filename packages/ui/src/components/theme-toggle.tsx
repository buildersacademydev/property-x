"use client"

import { motion } from "motion/react"
import * as React from "react"
import { cn } from "@/lib/utils"
import { useThemeToggle } from "@/hooks/use-theme-toggle"

export function ThemeToggle() {
    const { isDark, toggleTheme } = useThemeToggle()
    const [isHovered, setIsHovered] = React.useState(false)

    const shouldAnimate = isDark ? !isHovered : isHovered

    return (
        <button
            type="button"
            className={cn(
                `flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg
        border shadow-xs transition-all duration-300 hover:bg-accent
        active:scale-95`,
                "border-input bg-background text-foreground"
            )}
            onClick={toggleTheme}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
                            y: shouldAnimate ? 5 : 0,
                            x: shouldAnimate ? -20 : 0,
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
