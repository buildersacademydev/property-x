"use client"

import { useWallet } from "@/providers/wallet-provider"
import { AnimatePresence, motion } from "motion/react"
import React, { useState, type ComponentPropsWithoutRef } from "react"

import { Button } from "@workspace/ui/components/button"
import { Icons } from "@workspace/ui/components/icons"
import { cn } from "@workspace/ui/lib/utils"

type ConnectWalletProps = ComponentPropsWithoutRef<typeof Button> & {
    isNav?: boolean
}

const ConnectWallet = ({ isNav = false, ...props }: ConnectWalletProps) => {
    const { getConnect, connected, getDisconnect } = useWallet()
    const [hovered, setHovered] = useState(false)

    const handleButtonClick = () => {
        if (!connected) {
            getConnect()
        } else if (connected) {
            getDisconnect()
        }
    }

    return (
        <Button
            size="default"
            variant={connected ? "destructive" : "default"}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            {...props}
            className={
                cn(
                    "group relative flex cursor-pointer items-center gap-2 rounded-lg",
                    props.className
                )
            }
            onClick={handleButtonClick}
        >
            {
                connected ? (
                    <Icons.power size={16} />
                ) : (
                    <div className="relative size-4" >
                        <AnimatePresence mode="wait" initial={false} >
                            {
                                hovered ? (
                                    <motion.div
                                        key="unplug"
                                        initial={{ opacity: 0, y: 5, rotate: -15 }}
                                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                                        exit={{ opacity: 0, y: -5, rotate: 15 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute inset-0"
                                    >
                                        <Icons.unplug size={16} />
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
                                        <Icons.plug size={16} />
                                    </motion.div>
                                )}
                        </AnimatePresence>
                    </div>
                )}
            <span>{connected ? "Disconnect Wallet" : "Connect Wallet"} </span>
        </Button>
    )
}

export default ConnectWallet
