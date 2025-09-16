"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

import { Icons } from "./icons"
import Logo from "./logo"

interface NavProps {
  onNavigate?: (id: string) => void
  isScrolled?: boolean
}

const Nav: React.FC<NavProps> = ({ onNavigate, isScrolled }) => {
  const MenuIcon = Icons.menu
  const ArrowRight = Icons.arrowRight

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-md"
          : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <div className="hidden items-center gap-6 md:flex">
            {[
              { id: "features", label: "Features" },
              { id: "how-it-works", label: "How It Works" },
              { id: "testimonials", label: "Testimonials" },
              { id: "faq", label: "FAQ" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate?.(link.id)}
                className="text-sm transition-colors hover:text-primary"
              >
                {link.label}
              </button>
            ))}
            <Button size="sm" className="group">
              Join Launch List
              <ArrowRight
                className="ml-1 h-4 w-4 transition-transform
                  group-hover:translate-x-1"
              />
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="md:hidden">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
