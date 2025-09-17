"use client"

import React from "react"

const ListLoading = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-80 animate-pulse rounded-xl border bg-muted/30"
        />
      ))}
    </div>
  )
}

export default ListLoading
