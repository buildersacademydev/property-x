"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import ConnectWallet from "./connect-wallet"
import { Icons } from "./icons"
import Logo from "./logo"

const Nav = () => {
  return (
    <nav
      className={cn(
        "sticky top-0 right-0 left-0 z-50 transition-all duration-300",
        "border-b border-border/50 bg-background/80 backdrop-blur-md",
        "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <div className="hidden items-center gap-6 md:flex">
            {[
              { id: "apts", label: "Your Apts" },
              { id: "listings", label: "Your Listings" },
            ].map((link) => (
              <button
                key={link.id}
                className="text-sm transition-colors hover:text-primary"
              >
                {link.label}
              </button>
            ))}
            <ConnectWallet isNav />
          </div>

          <Button variant="ghost" size="sm" className="md:hidden">
            <Icons.menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
