"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar"
import ConnectWallet from "@/components/common/connect-wallet"
import Logo from "@/components/common/logo"
import { NextLink } from "@/components/common/next-link"
import { ThemeToggle } from "@/components/common/theme-toggle"

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
    name: "Profile",
    link: "/profile",
  },
]

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Navbar className="px-4">
      {/* Desktop Navigation */}
      <NavBody>
        <Logo />
        <div
          className="flex flex-1 flex-row items-center justify-center space-x-1
            text-sm font-medium"
        >
          {navItems.map((item, idx) => {
            const isActive = pathname === item.link
            return (
              <NextLink
                key={`link-${idx}`}
                href={item.link as any}
                className={cn(
                  "relative rounded-md px-4 py-2 transition-colors",
                  isActive
                    ? "bg-accent font-semibold text-foreground"
                    : `text-muted-foreground hover:bg-accent/50
                      hover:text-foreground`
                )}
              >
                <span className="relative z-20">{item.name}</span>
              </NextLink>
            )
          })}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ConnectWallet isNav />
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
              <NextLink
                key={`mobile-link-${idx}`}
                href={item.link as any}
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
              </NextLink>
            )
          })}
          <div className="mt-2 flex w-full flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
            <ConnectWallet isNav={false} />
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}

export default Nav
