import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"

import "./globals.css"

import { WalletProvider } from "@/providers/wallet-provider"

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
      <body className={`${geistMono.variable} antialiased`}>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  )
}
