"use client"

import { useEffect, useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Icons } from "@workspace/ui/components/icons"

export function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 1000)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!showScrollTop) return null

  return (
    <Button
      onClick={scrollToTop}
      size="sm"
      className="fixed right-6 bottom-6 z-50 h-12 w-12 animate-in rounded-full
        p-0 shadow-lg transition-all duration-300 slide-in-from-bottom-2
        hover:shadow-xl"
    >
      <Icons.chevronUp className="h-5 w-5" />
    </Button>
  )
}
