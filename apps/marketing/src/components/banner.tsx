"use client"

import { cn } from "@workspace/ui/lib/utils"
import { AnimatePresence, motion } from "motion/react"
import * as React from "react"

interface BannerProps {
    show: boolean
    onHide: () => void
    icon?: React.ReactNode
    title: React.ReactNode
    action: {
        label: string
        onClick: () => void
    }
    announcement?: string
    learnMoreUrl?: string
    className?: string
}

export function Banner({
    show,
    onHide,
    icon,
    title,
    action,
    announcement = "📣 Announcement",
    learnMoreUrl,
    className,
}: BannerProps) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={cn("relative w-full", className)}
                >
                    <div
                        className={cn(
                            "flex w-full items-center justify-between space-x-4",
                            "rounded-full bg-primary/20 ring-1 ring-accent",
                            "px-3 py-2 sm:px-4"
                        )}
                    >
                        {/* Left side: Announcement badge + title */}
                        <div className="flex flex-1 items-center space-x-2 overflow-hidden">
                            <div
                                className={cn(
                                    `flex w-fit items-center gap-1.5 rounded-full bg-accent px-2.5
                  py-1`,
                                    "text-xs font-medium text-primary sm:text-sm",
                                    "whitespace-nowrap"
                                )}
                            >
                                {icon && <span className="flex-shrink-0">{icon}</span>}
                                <span className="hidden sm:inline">{announcement}</span>
                            </div>
                            <p
                                className="truncate text-xs font-medium text-primary sm:text-sm"
                            >
                                {title}
                            </p>
                        </div>

                        {/* Right side: Action button + close */}
                        <div className="flex items-center space-x-2">
                            <button
                                type="button"
                                onClick={action.onClick}
                                className={cn(
                                    "flex items-center space-x-1 whitespace-nowrap",
                                    "rounded-full bg-primary/10 px-3 py-1",
                                    "text-xs font-medium text-primary sm:text-sm",
                                    "transition-colors hover:bg-primary/20",
                                    "ring-1 ring-primary/20"
                                )}
                            >
                                <span>{action.label}</span>
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="flex-shrink-0"
                                >
                                    <path
                                        d="M8.78141 5.33312L5.20541 1.75712L6.14808 0.814453L11.3334 5.99979L6.14808 11.1851L5.20541 10.2425L8.78141 6.66645H0.666748V5.33312H8.78141Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
