import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"

import "./globals.css"

import { QueryProvider } from "@/providers/query-provider"
import { WalletProvider } from "@/providers/wallet-provider"
import Footer from "@/components/common/footer"
import Nav from "@/components/common/nav"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "PropertyX Protocol",
  description: "Tokenize Urban Real-World Assets on Stacks",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} dark bg-background text-foreground
          antialiased`}
      >
        <WalletProvider>
          <QueryProvider>
            <Nav />
            {children}
            <Footer />
          </QueryProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
