import * as React from "react"
import { Card } from "@/components/ui/card"

// Simple skeleton block utility (same style language as other loading components)
const Skel = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-muted ${className}`} />
)

// Loading state for the Explore (Marketplace Listings) page while server/data fetch occurs.
// Provides a responsive grid of placeholder cards matching the eventual layout.
const LoadingExplore: React.FC = () => {
  // Number of placeholder cards to show (roughly a first screenful)
  const placeholders = Array.from({ length: 6 }, (_, i) => i)
  return (
    <div
      className="container mx-auto px-4 py-8"
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <div className="mb-8 space-y-3">
        <Skel className="h-8 w-72 max-w-full" />
        <Skel className="h-4 w-40" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {placeholders.map((i) => (
          <Card key={i} className="overflow-hidden p-0">
            {/* Image area */}
            <div
              className="relative aspect-video w-full overflow-hidden
                bg-accent/30"
            >
              <div className="absolute inset-0 animate-pulse bg-accent/40" />
            </div>
            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <Skel className="h-5 w-3/4" />
                <Skel className="h-3 w-1/2" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <Skel className="h-3 w-2/3" />
                  <Skel className="h-4 w-3/4" />
                </div>
                <div className="space-y-2">
                  <Skel className="h-3 w-2/3" />
                  <Skel className="h-4 w-1/2" />
                </div>
                <div className="space-y-2">
                  <Skel className="h-3 w-2/3" />
                  <Skel className="h-4 w-2/3" />
                </div>
                <div className="space-y-2">
                  <Skel className="h-3 w-2/3" />
                  <Skel className="h-4 w-1/2" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Skel className="h-9 flex-1" />
                <Skel className="h-9 flex-1" />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <span className="sr-only">Loading marketplace listings...</span>
    </div>
  )
}

export default LoadingExplore
