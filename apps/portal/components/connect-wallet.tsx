"use client"

import { useWallet } from "@/providers/wallet-provider"
import { AnimatePresence, motion } from "motion/react"
import React, { useState, type ComponentPropsWithoutRef } from "react"

import { Button } from "@workspace/ui/components/button"
import { Icons } from "@workspace/ui/components/icons"
import { cn } from "@workspace/ui/lib/utils"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import ProfileLink from "./profile-link"

type ConnectWalletProps = ComponentPropsWithoutRef<typeof Button> & {
    isNav?: boolean
}

const ConnectWallet = ({ isNav = false, ...props }: ConnectWalletProps) => {
    const { getConnect, connected, getDisconnect, stxAddress } = useWallet()
    const [hovered, setHovered] = useState(false)

    const handleButtonClick = () => {
        if (!connected) {
            getConnect()
        }
    }

    const maskAddress = (addr: string, visible: number = 4) => {
        if (!addr) return ""
        if (addr.length <= visible * 2) return addr
        return `${addr.slice(0, visible)}...${addr.slice(-visible)}`
    }

    if (connected) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="default"
                        variant="ghost"
                        {...props}
                        className={cn(
                            "group relative flex cursor-pointer items-center gap-2 rounded-lg",
                            props.className
                        )}
                    >
                        <Avatar className="size-8">
                            <AvatarFallback
                                aria-label="Profile avatar"
                                className="text-transparent"
                                style={{
                                    background:
                                        "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 45%, var(--ring) 100%)",
                                }}
                            />
                        </Avatar>
                        <Icons.chevronDown className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    sideOffset={16}
                    className={cn(
                        "mb-3 flex w-(--radix-dropdown-menu-trigger-width) min-w-70 flex-col gap-6 rounded-2xl border-2 border-border bg-popover px-6 py-4"
                    )}
                    align="end"
                    side="bottom"
                >
                    <div className="grid flex-1 text-left leading-tight">
                        <span className="truncate font-bold">Your Wallet</span>
                        <span className="truncate font-mono text-sm">
                            {stxAddress ? maskAddress(stxAddress) : "Not connected"}
                        </span>
                    </div>
                    <DropdownMenuGroup className="p-0">
                        <DropdownMenuItem className="p-0" asChild>
                            <ProfileLink showRedirect redirectUrl="/your-apts" icon="home">
                                Your Apts
                            </ProfileLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0" asChild>
                            <ProfileLink
                                showRedirect
                                redirectUrl="/your-listings"
                                icon="list"
                            >
                                Your Listings
                            </ProfileLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0" asChild>
                            <ProfileLink showRedirect redirectUrl="/profile" icon="user">
                                Your Profile
                            </ProfileLink>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-2" />
                        <ProfileLink icon="power" onClick={getDisconnect} className="text-destructive bg-destructive/10 hover:bg-destructive/40">
                            Disconnect Wallet
                        </ProfileLink>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <Button
            size="default"
            variant="default"
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
            <span>Connect Wallet</span>
        </Button>
    )
}

export default ConnectWallet
