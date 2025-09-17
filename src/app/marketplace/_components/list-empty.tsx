"use client"

import React from "react"
import { Icons } from "@/components/common/icons"

const ListEmpty = () => {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl border
        bg-card/40 p-12 text-center"
    >
      <Icons.users className="mb-4 h-10 w-10 text-muted-foreground" />
      <p className="max-w-sm text-muted-foreground">
        No listings available right now. Connect your wallet or check back
        later.
      </p>
    </div>
  )
}

export default ListEmpty
