"use client"

import type { ComponentProps } from "react"
import Link, { type LinkProps } from "next/link"
import { useRouter } from "next/navigation"

export type NextLinkProps = ComponentProps<typeof Link>
export type { LinkProps }

export function NextLink({
  children,
  prefetch = false,
  ...props
}: NextLinkProps) {
  const router = useRouter()

  return (
    <Link
      {...props}
      prefetch={prefetch}
      onMouseEnter={() => {
        router.prefetch(props.href as string)
      }}
    >
      {children}
    </Link>
  )
}
