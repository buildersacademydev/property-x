"use client"

import { QueryProvider } from "@/providers/query-provider"
import React from "react"
import dynamic from "next/dynamic"
import { ThemeProvider } from "@workspace/ui/components/theme-provider"


const WalletProvider = dynamic(
    () => import("@/providers/wallet-provider").then((m) => m.WalletProvider),
    { ssr: false }
)

export function RootProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <WalletProvider>
                <QueryProvider>{children}</QueryProvider>
            </WalletProvider>
        </ThemeProvider>
    )
}

export default RootProviders
