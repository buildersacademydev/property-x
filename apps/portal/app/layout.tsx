import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "@workspace/ui/globals.css";
import RootProviders from "@/providers/root-providers";
import Nav from "@/components/nav";
import Notifications from "@/components/notifications";
import { Toaster } from "sonner";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "PropertyX Protocol",
  description: "Tokenize Urban Real-World Assets on PropertyX",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.className} min-h-dvh bg-background
          text-foreground antialiased`}
        suppressHydrationWarning
      >
        <RootProviders>
          <Nav />
          <main className="mt-12">{children}</main>
        </RootProviders>
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          duration={3000}
        />
        <Notifications />
      </body>
    </html>
  );
}
