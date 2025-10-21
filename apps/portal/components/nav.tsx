"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Logo from "@workspace/ui/components/logo"
import Link from "next/link"
import { cn } from "@workspace/ui/lib/utils"
import { Icons } from "@workspace/ui/components/icons"
import { ThemeToggle } from "@workspace/ui/components/theme-toggle"
import ConnectWallet from "./connect-wallet"

const navItems = [
    {
        name: "Your Apts",
        link: "/your-apts",
    },
    {
        name: "Your Listings",
        link: "/your-listings",
    },
    {
        name: "Explore",
        link: "/explore",
    },
] as const

const Nav = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    return (
        <>
            <nav className="fixed inset-x-0 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center">
                        <Logo />
                    </div>

                    <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
                        {navItems.map((item, idx) => {
                            const isActive = pathname === item.link
                            return (
                                <Link
                                    key={`link-${idx}`}
                                    href={item.link}
                                    className={cn(
                                        "relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-accent text-accent-foreground shadow-sm"
                                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            )
                        })}
                    </div>

                    <div className="hidden items-center gap-2 md:flex">
                        <ThemeToggle />
                        <ConnectWallet isNav />
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <Icons.x className="h-6 w-6" />
                        ) : (
                            <Icons.menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="border-t bg-background md:hidden">
                        <div className="space-y-1 px-4 pb-3 pt-2">
                            {navItems.map((item, idx) => {
                                const isActive = pathname === item.link
                                return (
                                    <Link
                                        key={`mobile-link-${idx}`}
                                        href={item.link}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "block rounded-lg px-4 py-2.5 text-base font-medium transition-colors",
                                            isActive
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            })}
                            <div className="space-y-3 border-t pt-3">
                                <div className="flex items-center justify-between px-4">
                                    <span className="text-sm font-medium text-muted-foreground">Theme</span>
                                    <ThemeToggle />
                                </div>
                                <div className="px-4">
                                    <ConnectWallet className="w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <div className="h-16" />
        </>
    )
}

export default Nav
