"use client"

import { AnimatePresence, motion } from "motion/react"
import React, { useState, type ComponentPropsWithoutRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { Icons } from "@workspace/ui/components/icons"

type LaunchAppProps = ComponentPropsWithoutRef<typeof Button> & {
}

const LaunchApp = ({ ...props }: LaunchAppProps) => {
    const router = useRouter()
    const [hovered, setHovered] = useState(false)

    const handleButtonClick = () => {
        router.push("/")
    }

    return (
        <>
            <Button
                size="default"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                {...props}
                className={cn(
                    "group relative flex cursor-pointer items-center gap-2 rounded-lg",
                    props.className
                )}
                onClick={handleButtonClick}
            >
                <div className="relative size-4">
                    <AnimatePresence mode="wait" initial={false}>
                        {hovered ? (
                            <motion.div
                                key="unplug"
                                initial={{ opacity: 0, y: 5, rotate: -15 }}
                                animate={{ opacity: 1, y: 0, rotate: 0 }}
                                exit={{ opacity: 0, y: -5, rotate: 15 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0"
                            >
                                <Icons.zap size={16} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="plug"
                                initial={{ opacity: 0, y: 5, rotate: 15 }}
                                animate={{ opacity: 1, y: 0, rotate: 0 }}
                                exit={{ opacity: 0, y: -5, rotate: -15 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0"
                            >
                                <Icons.power size={16} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <span>{"Launch App"}</span>
            </Button>

        </>
    )
}

export default LaunchApp
