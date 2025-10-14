"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, Navbar, NavBody } from "./resizable-navbar"
import Logo from "@workspace/ui/components/logo"
import Link from "next/link"
import { cn } from "@workspace/ui/lib/utils"
import LaunchApp from "./launch-app"
import { ThemeToggle } from "@workspace/ui/components/theme-toggle"

const navItems = [
    {
        name: "WhitePaper",
        link: "/white-paper",
    },
    {
        name: "Contact",
        link: "/contact",
    },
] as const

const Nav = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    return (
        <Navbar className="px-4">
            <NavBody>
                <Logo />
                <div
                    className="flex flex-1 flex-row items-center justify-center space-x-1
            text-sm font-medium"
                >
                    {navItems.map((item, idx) => {
                        const isActive = pathname === item.link
                        return (
                            <Link
                                key={`link-${idx}`}
                                href={item.link}
                                className={cn(
                                    "relative rounded-md px-4 py-2 transition-colors",
                                    isActive
                                        ? "bg-accent font-semibold text-foreground"
                                        : `text-muted-foreground hover:bg-accent/50
                      hover:text-foreground`
                                )}
                            >
                                <span className="relative z-20">{item.name}</span>
                            </Link>
                        )
                    })}
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <LaunchApp />
                </div>
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav>
                <MobileNavHeader>
                    <Logo />
                    <MobileNavToggle
                        isOpen={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    />
                </MobileNavHeader>

                <MobileNavMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                >
                    {navItems.map((item, idx) => {
                        const isActive = pathname === item.link
                        return (
                            <Link
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "relative w-full rounded-md px-3 py-2 transition-colors",
                                    isActive
                                        ? "bg-accent font-semibold text-foreground"
                                        : `text-muted-foreground hover:bg-accent/50
                      hover:text-foreground`
                                )}
                            >
                                <span className="block text-base">{item.name}</span>
                            </Link>
                        )
                    })}
                    <div className="mt-2 flex w-full flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Theme</span>
                            <ThemeToggle />
                        </div>
                        <LaunchApp />
                    </div>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    )
}

export default Nav
