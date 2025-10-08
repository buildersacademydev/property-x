"use client"

import { Grid2x2PlusIcon, MenuIcon } from "lucide-react"
import React from "react"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetFooter } from "@/components/ui/sheet"

export function FloatingHeader() {
  const [open, setOpen] = React.useState(false)

  const links = [
    {
      label: "Features",
      href: "#",
    },
    {
      label: "Pricing",
      href: "#",
    },
    {
      label: "About",
      href: "#",
    },
  ]

  return (
    <header
      className={cn(
        "sticky top-5 z-50",
        "mx-auto w-full max-w-3xl rounded-lg border shadow",
        `bg-background/95 backdrop-blur-lg
        supports-[backdrop-filter]:bg-background/80`
      )}
    >
      <nav className="mx-auto flex items-center justify-between p-1.5">
        <div
          className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1
            duration-100 hover:bg-accent"
        >
          <Grid2x2PlusIcon className="size-5" />
          <p className="font-mono text-base font-bold">Asme</p>
        </div>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              className={buttonVariants({ variant: "ghost", size: "sm" })}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm">Login</Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            >
              <MenuIcon className="size-4" />
            </Button>
            <SheetContent
              className="gap-0 bg-background/95 backdrop-blur-lg
                supports-[backdrop-filter]:bg-background/80"
              showClose={false}
              side="left"
            >
              <div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
                {links.map((link) => (
                  <a
                    key={link.href}
                    className={buttonVariants({
                      variant: "ghost",
                      className: "justify-start",
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <SheetFooter>
                <Button variant="outline">Sign In</Button>
                <Button>Get Started</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
